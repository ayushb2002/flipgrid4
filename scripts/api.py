from flask import Flask,jsonify

app = Flask(__name__)

@app.route("/")
def hello_world():
    r={'abcd':3434,'(423423,123123)':True}
    return jsonify(r)
@app.route("/check/<int:id>/<string:xyz>")
def check(id,xyz):
    print (id,xyz)
    return str(id)+xyz
app.run(debug=True)
