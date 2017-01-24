import test from 'ava';
import cote from 'cote';

test('automatic pass', t => {
    t.pass();
});

test.cb('create user', t => {
    var userRequester = new cote.Requester({
        name: 'test user requester',
        namespace: 'user'
    });

    userRequester.on('ready', _ => {
        userRequester.send({type: 'create'}, (err, user) => {
            t.is(user.balance, 30);
            t.truthy(user.id);
            t.end();
        });
    });
});
