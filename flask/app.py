from flask import Flask, render_template, request,jsonify
from joblib import load
import json
import sys

app = Flask(__name__)

status_model=load('status_classifier.joblib')
package_model=load('package_classifier.joblib')

@app.route('/',methods=['GET'])
def home():
    return "Hello From Flask"

@app.route('/predict', methods=['POST'])
def predict():
    print("ashish", file=sys.stderr)
    if request.method == "POST":
        data=request.json
        print(data, file=sys.stderr)
        qa=float(data['qa'])
        lr=float(data['lr'])
        va=float(data['va'])
        programming=float(data['programming'])
        cn=float(data['cn'])
        dsa=float(data['dsa'])
        ml=float(data['ml'])
        os=float(data['os'])
        oop=float(data['oop'])
        dbms=float(data['dbms'])
        cgpa=float(data['cgpa'])
        activeBacklog=int(data['activeBacklogs'])
        deadBacklog=int(data['deadBacklogs'])

        if activeBacklog < 3:
            print("into prediction block",file=sys.stderr)
            status_result = status_model.predict([[qa,lr,va,programming,cgpa,cn,oop,dbms,os,dsa,ml,activeBacklog,deadBacklog]])
            package_result = package_model.predict([[qa,lr,va,programming,cgpa,cn,oop,dbms,os,dsa,ml,activeBacklog,deadBacklog]])
            # result = status_model.predict([[19,19,19,19,9,9,9,9,9,9,9,0,0]])
            print("status=",status_result[0],file=sys.stderr)
            print("package=",package_result[0],file=sys.stderr)
        else:
            print("out of prediction block",file=sys.stderr)
            status_result=[0]
            package_result=[0]
            
        return jsonify({"status":int(status_result[0]),"package_range":int(package_result[0])}),200

if __name__ == '__main__':
	app.run()
