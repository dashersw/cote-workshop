import test from 'ava';
import cote from 'cote';

test('automatic pass', t => {
    t.pass();
});

test.cb('create user', t => {
    var userRequester = new cote.Requester({
        name: 'test user requester 1',
        namespace: 'user'
    });

    userRequester.send({ type: 'create' }, (err, user) => {
        t.is(user.balance, 30);
        t.truthy(user.id);
        t.end();
    });
});

test.cb('get user', t => {
    var userRequester = new cote.Requester({
        name: 'test user requester 2',
        namespace: 'user'
    });

    userRequester.send({ type: 'create' }, (err, newUser) => {
        t.is(newUser.balance, 30);
        t.truthy(newUser.id);

        userRequester.send({ type: 'get', id: newUser.id }, (err, user) => {
            console.log(err, user)
            t.is(user.id, newUser.id);
            t.is(user.balance, newUser.balance);
            t.end();
        })
    });
});
