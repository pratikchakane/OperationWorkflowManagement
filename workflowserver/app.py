from flask import Flask,request 
import pymysql
from flask_cors import CORS

import threading
lock = threading.Lock()
import json 
# from werkzeug.utils import secure_filename
import os
import pathlib

import smtplib 
from email.mime.multipart import MIMEMultipart 
from email.mime.text import MIMEText 

app = Flask(__name__)

UPLOAD_FOLDER = 'static/files/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)
app.secret_key = 'any random string'

def dbConnection():
    try:
        connection = pymysql.connect(host="localhost", user="root", password="root", database="operationalflow")
        return connection
    except:
        print("Something went wrong in database Connection")

def dbClose():
    try:
        dbConnection().close()
    except:
        print("Something went wrong in Close DB Connection")

con = dbConnection()
cursor = con.cursor()

def sendemailtouser(usermail,ogpass):   
    fromaddr = "pranalibscproject@gmail.com"
    toaddr = usermail
    msg = MIMEMultipart()   
    msg['From'] = fromaddr  
    msg['To'] = toaddr  
    msg['Subject'] = "Workflow App"
    body = ogpass
    msg.attach(MIMEText(body, 'plain'))  
    s = smtplib.SMTP('smtp.gmail.com', 587) 
    s.starttls() 
    s.login(fromaddr, "wkwfgosewcljcpqh") 
    text = msg.as_string() 
    s.sendmail(fromaddr, toaddr, text) 
    s.quit()  

"----------------------------------------------------------------------------------------------------"

@app.route('/userRegister', methods=['GET', 'POST'])
def userRegister():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        email = data.get('email')
        mobile = data.get('mobile')
        password = data.get('password')
        typeofemp = data.get('type')
        
        cursor.execute('SELECT * FROM users WHERE username = %s and type = %s', (username,typeofemp))
        count = cursor.rowcount
        if count == 1:        
            return "fail"
        else:
            sql1 = "INSERT INTO users(username, email, mobile, password, type) VALUES (%s, %s, %s, %s, %s);"
            val1 = (username, email, mobile, password, typeofemp)
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
    return "fail"

@app.route('/userLogin', methods=['GET', 'POST'])
def userLogin():
    if request.method == 'POST':
        data = request.get_json()
        
        username = data.get('username')
        password = data.get('password')
        typeofemp = data.get('type')
        
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s AND type = %s', (username, password, typeofemp))
        count = cursor.rowcount
        if count == 1:        
            return "success"
        else:
            return "fail"
    return "fail"

@app.route('/addFormDetails', methods=['GET', 'POST'])
def addFormDetails():
    if request.method == 'POST':
        data = request.get_json()
        
        typeofform = data.get('typeofform')
        formval = data.get('formval')
        
        if typeofform == 'Others':            
            sql1 = "INSERT INTO formdetails(typeofform, formval) VALUES (%s, %s);"
            val1 = (typeofform, str(formval))
            cursor.execute(sql1,val1)
            con.commit()
            return "success"
        else:               
            cursor.execute('SELECT * FROM formdetails WHERE typeofform = %s', (typeofform))
            count = cursor.rowcount
            if count > 0:
                sql1 = "UPDATE formdetails SET formval = %s WHERE typeofform = %s;"
                val1 = (str(formval),typeofform)
                cursor.execute(sql1,val1)
                con.commit()
                return "success"
            else:
                sql1 = "INSERT INTO formdetails(typeofform, formval) VALUES (%s, %s);"
                val1 = (typeofform, str(formval))
                cursor.execute(sql1,val1)
                con.commit()
                return "success"
    return "fail"

@app.route('/loadForms/<typeofform>', methods=['GET', 'POST'])
def loadFiles(typeofform):
    try:
        # print(typeofform)
        
        lock.acquire()        
        cursor.execute('SELECT * FROM formdetails WHERE typeofform = %s', (typeofform))
        row = cursor.fetchall() 
        lock.release()
        
        jsonObj = json.dumps(row) 
        return jsonObj
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/uploadfile', methods=['GET', 'POST'])
def uploadfile():
    if request.method == 'POST':
        print("POST")
        f1 = request.files["File"]   
        Filename = request.form["Filename"]  
        username = request.form["username"]           
        pathlib.Path(app.config['UPLOAD_FOLDER'], username).mkdir(exist_ok=True)   
        f1.save(os.path.join(app.config['UPLOAD_FOLDER'],username, Filename)) 
        return "success"
        
    return "fail"
    
@app.route('/UserApplyForm', methods=['GET', 'POST'])
def UserApplyForm():
    if request.method == 'POST':
        data = request.get_json()
        
        print("data",data)
        
        username = data.get('username')
        usertype = data.get('usertype')
        inputval = data.get('listofinputs')
        whoaccess = data.get('checks')
        typeofapply = data.get('typeofform')
        
        if typeofapply == 'Others':
            for i in whoaccess.split('-'):
                sql1 = "INSERT INTO userapply(username, usertype, inputval, whoaccess, typeofapply) VALUES (%s, %s, %s, %s, %s);"
                val1 = (username, usertype, str(inputval), str(i), typeofapply)
                cursor.execute(sql1,val1)
                con.commit()
            return "success"
        else: 
            cursor.execute('SELECT * FROM userapply WHERE username = %s and usertype = %s and typeofapply = %s', (username,usertype,typeofapply))
            count = cursor.rowcount
            if count > 0:        
                return "fail"
            else:
                for i in whoaccess.split('-'):
                    sql1 = "INSERT INTO userapply(username, usertype, inputval, whoaccess, typeofapply) VALUES (%s, %s, %s, %s, %s);"
                    val1 = (username, usertype, str(inputval), str(i), typeofapply)
                    cursor.execute(sql1,val1)
                    con.commit()
                return "success"
    return "fail"

@app.route('/loadRequest/<typeofuser>', methods=['GET', 'POST'])
def loadRequest(typeofuser):
    try:
        
        lock.acquire()        
        cursor.execute('SELECT * FROM userapply WHERE whoaccess = %s',(typeofuser))
        row = cursor.fetchall() 
        lock.release()
        
        jsonObj = json.dumps(row) 
        return jsonObj
    
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/updateStatus', methods=['GET', 'POST'])
def updateStatus():
    if request.method == 'POST':
        data = request.get_json()
        
        idofr = data.get('id')
        username = data.get('username')
        typeofapp = data.get('typeofapp')
        status = data.get('status')   
        
        cursor.execute('SELECT * FROM userapply WHERE id = %s and username = %s and typeofapply = %s',(idofr,username,typeofapp))
        row = cursor.fetchone() 
        
        sql1 = "INSERT INTO status(id,username, usertype, inputval, whoaccess, typeofapply,status) VALUES (%s, %s, %s, %s, %s, %s, %s);"
        val1 = (str(row[0]),str(row[1]),str(row[2]),str(row[3]),str(row[4]),str(row[5]),status)
        cursor.execute(sql1,val1)
        con.commit()
        
        lock.acquire()        
        cursor.execute('SELECT * FROM userapply WHERE id = %s and username = %s and typeofapply = %s',(idofr,username,typeofapp))
        row1 = cursor.fetchone() 
        lock.release()
        
        cursor.execute('SELECT * FROM users WHERE username = %s and type = %s', (username,row1[2]))
        row2 = cursor.fetchone()
        
        sql11 = 'DELETE FROM userapply WHERE id = %s and username = %s and typeofapply = %s'
        val11 = (idofr,username,typeofapp)
        cursor.execute(sql11,val11)
        con.commit() 
        
        if row2 != 'None':
            print("------------------------------------")
            print(row2[2])            
            sendemailtouser(str(row2[2]),"Your request accepted !")
            print("------------------------------------")
        
        return "success"
    
    return "fail"

@app.route('/updateStatus1', methods=['GET', 'POST'])
def updateStatus1():
    if request.method == 'POST':
        data = request.get_json()
        
        idofr = data.get('id')
        username = data.get('username')
        typeofapp = data.get('typeofapp')
        status = data.get('status')
        messagebody = data.get('messagebody')
            
        lock.acquire()        
        cursor.execute('SELECT * FROM userapply WHERE id = %s and username = %s and typeofapply = %s',(idofr,username,typeofapp))
        row = cursor.fetchone() 
        lock.release()
        
        cursor.execute('SELECT * FROM users WHERE username = %s and type = %s', (username,row[2]))
        row1 = cursor.fetchone()           
        
        if row1 != 'None':
            print("------------------------------------")
            print(row1[2])            
            sendemailtouser(str(row1[2]),str(messagebody))
            print("------------------------------------")
        
            sql1 = "INSERT INTO status(id,username, usertype, inputval, whoaccess, typeofapply,status) VALUES (%s, %s, %s, %s, %s, %s, %s);"
            val1 = (str(row[0]),str(row[1]),str(row[2]),str(row[3]),str(row[4]),str(row[5]),status)
            cursor.execute(sql1,val1)
            con.commit()
            
            sql11 = 'DELETE FROM userapply WHERE id = %s and username = %s and typeofapply = %s'
            val11 = (idofr,username,typeofapp)
            cursor.execute(sql11,val11)
            con.commit() 
            return "success" 
        return "fail"
    
    return "fail"

@app.route('/loadStatuslst/<user>', methods=['GET', 'POST'])
def loadStatuslst(user):
    try:
        
         lock.acquire()        
         cursor.execute('SELECT whoaccess,typeofapply,status FROM status WHERE username = %s',(user))
         row = cursor.fetchall() 
         lock.release()
         p2=[]
         l2=[]
         a2=[]
         o2=[]
         
         for i in row:
             if i[1] == 'Promotion':
                 if i[2] == 'Accepted':
                     p2.append(i)    
             elif i[1] == 'Leave':
                 if i[2] == 'Accepted':
                     l2.append(i)    
             elif i[1] == 'Appraisal':
                 if i[2] == 'Accepted':
                     a2.append(i)
             else:
                 if i[2] == 'Accepted':
                     o2.append(i)
                     
         mainlst = ['HR', 'Project manager','Team Leader']
         Leave_lst = []
         for i in range(len(l2)):
             for j in mainlst:
                 if j in l2[i]:
                     Leave_lst.append(j)    
         
         print(Leave_lst)
         test_list1=Leave_lst+[i for i in mainlst if not i in Leave_lst]
         print(test_list1)
         print('-----------------------')
         
         Promotion_lst = []
         for i in range(len(p2)):
             for j in mainlst:
                 if j in p2[i]:
                     Promotion_lst.append(j)    
         
         print(Promotion_lst)
         test_list2=Promotion_lst+[i for i in mainlst if not i in Promotion_lst]
         print(test_list2)
         print('-----------------------')
         
         Appraisal_lst = []
         for i in range(len(a2)):
             for j in mainlst:
                 if j in a2[i]:
                     Appraisal_lst.append(j)    
         
         print(Appraisal_lst)
         test_list3=Appraisal_lst+[i for i in mainlst if not i in Appraisal_lst]
         print(test_list3)
         print('-----------------------')
         
         Other_lst = []
         for i in range(len(o2)):
             for j in mainlst:
                 if j in o2[i]:
                     Other_lst.append(j)    
         
         print(Other_lst)
         test_list4=Other_lst+[i for i in mainlst if not i in Other_lst]
         print(test_list4)
         print('-----------------------')
         
         test_list1.insert(0, "Start")
         test_list2.insert(0, "Start")
         test_list3.insert(0, "Start")
         test_list4.insert(0, "Start")
         
         jsonObj = json.dumps([Leave_lst,test_list1,Promotion_lst,test_list2,Appraisal_lst,test_list3,Other_lst,test_list4]) 
         return jsonObj
    
    except Exception as ex:
        print(ex)                 
        return ""
    
@app.route('/loadStatuslst1/<user>', methods=['GET', 'POST'])
def loadStatuslst1(user):
    try:
        
        lock.acquire()        
        cursor.execute('SELECT whoaccess,typeofapply,status FROM status WHERE username = %s',(user))
        row = cursor.fetchall() 
        lock.release()
        p2=[]
        l2=[]
        a2=[]
        o2=[]
        
        for i in row:
            if i[1] == 'Promotion':
                if i[2] == 'Accepted':
                    p2.append(i)    
            elif i[1] == 'Leave':
                if i[2] == 'Accepted':
                    l2.append(i)    
            elif i[1] == 'Appraisal':
                if i[2] == 'Accepted':
                    a2.append(i)
            else:
                if i[2] == 'Accepted':
                    o2.append(i)
                    
        mainlst = ['HR', 'Project manager','Team Leader']
        Leave_lst = []
        for i in range(len(l2)):
            for j in mainlst:
                if j in l2[i]:
                    Leave_lst.append(j)    
        
        print(Leave_lst)
        test_list1=Leave_lst+[i for i in mainlst if not i in Leave_lst]
        print(test_list1)
        print('-----------------------')
        
        Promotion_lst = []
        for i in range(len(p2)):
            for j in mainlst:
                if j in p2[i]:
                    Promotion_lst.append(j)    
        
        print(Promotion_lst)
        test_list2=Promotion_lst+[i for i in mainlst if not i in Promotion_lst]
        print(test_list2)
        print('-----------------------')
        
        Appraisal_lst = []
        for i in range(len(a2)):
            for j in mainlst:
                if j in a2[i]:
                    Appraisal_lst.append(j)    
        
        print(Appraisal_lst)
        test_list3=Appraisal_lst+[i for i in mainlst if not i in Appraisal_lst]
        print(test_list3)
        print('-----------------------')
        
        Other_lst = []
        for i in range(len(o2)):
            for j in mainlst:
                if j in o2[i]:
                    Other_lst.append(j)    
        
        print(Other_lst)
        test_list4=Other_lst+[i for i in mainlst if not i in Other_lst]
        print(test_list4)
        print('-----------------------')
        
        test_list1.insert(0, "Start")
        test_list2.insert(0, "Start")
        test_list3.insert(0, "Start")
        test_list4.insert(0, "Start")
        
        jsonObj = json.dumps([Leave_lst,test_list1,Promotion_lst,test_list2,Appraisal_lst,test_list3,Other_lst,test_list4]) 
        return jsonObj
    
    except Exception as ex:
        print(ex)                 
        return ""

    
if __name__ == "__main__":
    app.run("0.0.0.0")
    # app.run(debug=True)
    
    # https://www.robinwieruch.de/react-checkbox/
    # https://codesandbox.io/s/dynamic-progressbar-forked-pqoi81?file=/package.json
    
    
