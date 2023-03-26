from flask import Flask, render_template, request,jsonify
from joblib import load
import json

app = Flask(__name__)

status_model=load('status_classifier.joblib')
package_model=load('package_classifier.joblib')

@app.route('/',methods=['GET'])
def home():
    return "Hello From Flask me"

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == "POST":
        data=request.get_json()
        # print(data)
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

        status_result = status_model.predict([[qa,lr,va,programming,cgpa,cn,oop,dbms,os,dsa,ml,activeBacklog,deadBacklog]])
        package_result = package_model.predict([[qa,lr,va,programming,cgpa,cn,oop,dbms,os,dsa,ml,activeBacklog,deadBacklog]])
        # result = status_model.predict([[19,19,19,19,9,9,9,9,9,9,9,0,0]])

        if status_result and package_result:
            return jsonify({"status":int(status_result[0]),"package_range":int(package_result[0])}),200

        return jsonify({"error":"failed"}),400

if __name__ == '__main__':
	app.run()
