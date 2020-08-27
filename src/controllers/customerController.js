const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE ESTADO != "BAJA";', (err, customers) => {
            if (err) {
                res.json(err);
            }
            console.log(customers);
            res.render('customer', {
                data: customers
            });
        });
    });
};

controller.showAdd = (req, res) => {
    res.render('add_customer', {

    });
};

controller.save = (req, res) => {
    const data = req.body;
    data.estado = 'ALTA';
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ? ', [data], (err, customer) => {
            if (err) {
                res.json(err);
            }

            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ESTADO = "BAJA" where ID = ?', id, (err, customer) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/');
        });
    });

};

controller.update = (req, res) => {
    const data = req.body;
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? where ID = ?', [data, id], (err, customer) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/');
        });
    });

};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer where ID = ?;', [id], (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('edit_customer', {
                data: customers[0]
            });

        });
    });
};

module.exports = controller;