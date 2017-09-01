import Sequelize from 'sequelize';

let sequelize = new Sequelize('db-instance', 'db-user', 'db-password', {
    host: 'HOST',
    port: 3306,
    dialect: 'mysql'
});

sequelize.authenticate().then((err) => {
 if (err) {
    console.log('There is connection in ERROR');
 } else {
    console.log('Connection has been established successfully');
 }
});

let Item = sequelize.define('Company', {
    id: Sequelize.STRING,
    name:Sequelize.STRING,
    branch: Sequelize.STRING
});
 
sequelize.sync({force:true}).then((err) => {
    if(err){
        console.log('An error occur while creating table');
    }else {
        console.log('Company table created successfully');
    }
});

let company1 = Item.build({
    id: 1,
    name:'Company 1',
    branch: 'Technology'
});

company1.save().then((err) => {
    if (err) {
        console.log('Error in Inserting Record');
    } else {
        console.log('Data successfully inserted');
    }
});

sequelize.sync().success(() => {
    Company.create({
        id: 2,
        name:'Company 2',
        branch: 'Telecom'
    }).success((data) => {
        console.log(data.values)
    })
});

Company.find({}).then((err,data) => {
    console.log(data);
});

Company.find({where:{branch:'Telecom'}}).then((err, data) => {
    console.log(data);
});

Company.find({where:{branch:'Telecom'}}).then((err, data) => {
    if(err){
        console.log(err);
    }
    if(data){
        data.updateAttributes({
            name:'Company x'
        }).success((data1) => {
            console.log(data1);
        })
    }
});

Company.find({where: {branch: 'Telecom'}}).then((err, data) => {
    if (err) {
        console.log(err);
    } else {
        data.destroy({}).then((err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log(data);
            }
        })
    }
    console.log(data);
});