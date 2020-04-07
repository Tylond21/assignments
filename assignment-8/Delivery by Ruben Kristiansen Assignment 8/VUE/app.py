"""
Assignment #8: Webshop
"""

from flask import Flask, request, g, abort
import mysql.connector
import json
import time

app = Flask(__name__)

# Application config
app.config["DATABASE_USER"] = "root"
# app.config["DATABASE_PASSWORD"] = "foobarfoo"
app.config["DATABASE_PASSWORD"] = ""
app.config["DATABASE_DB"] = "dat310"
app.config["DATABASE_HOST"] = "localhost"
app.debug = True  # only for development!


def get_db():
    if not hasattr(g, "_database"):
        print("create connection")
        g._database = mysql.connector.connect(host=app.config["DATABASE_HOST"], user=app.config["DATABASE_USER"],
                                              password=app.config["DATABASE_PASSWORD"], database=app.config["DATABASE_DB"])
    return g._database


@app.teardown_appcontext
def teardown_db(error):
    """Closes the database at the end of the request."""
    db = getattr(g, '_database', None)
    if db is not None:
        print("close connection")
        db.close()


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.route("/products")
def products():
    # retrieve products from database and return a JSON
    return json.dumps(getProducts())


@app.route("/order", methods=["POST"])
def order():
    data = request.get_json()
    db = get_db()
    cur = db.cursor()
    try:
        add_orders = ("INSERT INTO orders "
                      "(first_name, last_name, email, street, city, postcode) "
                      "VALUES (%(firstName)s, %(lastName)s, %(email)s, %(street)s, %(city)s, %(postcode)s )")
        data_order = {
            'firstName': data.get('firstName'),
            'lastName': data.get('lastName'),
            'email': data.get('email'),
            'street': data.get('street'),
            'city': data.get('city'),
            'postcode': data.get('postCode'),
        }
        cur.execute(add_orders, data_order)
        order_id = cur.lastrowid
        time.sleep(1)

        add_order_rows = ("INSERT INTO order_rows "
                          "(product_id, order_id, count, size) "
                          "VALUES (%(product_id)s, %(order_id)s, %(count)s, %(size)s )")
        for cart in data.get('carts'):
            data_order_row = {
                'product_id': cart.get('product_id'),
                'order_id': order_id,
                'count': cart.get('count'),
                'size': cart.get('size')
            }
            cur.execute(add_order_rows, data_order_row)
        db.commit()
    except mysql.connector.Error as err:
        return "error"
    finally:
        cur.close()
    return "ok"


def getProducts():
    # TODO: should retrieve products from database instead of hardcoded
    products = []
    db = get_db()
    cur = db.cursor()
    try:
        sql = "SELECT product_id, title, price, discount, img, description, details FROM products"
        cur.execute(sql)
        for (product_id, title, price, discount, img, description, details) in cur:
            products.append({
                "product_id": product_id,
                "title": title,
                "price": price,
                "discount": discount,
                "img": img,
                "description": description,
                "details": details
            })
        return products
    except mysql.connector.Error as err:
        return "error"
    finally:
        cur.close()


if __name__ == "__main__":
    app.run()
