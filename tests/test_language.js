function throw_error(msg) {
    throw Error(msg);
}

function assert(actual, expected, message) {
    function get_full_type(o) {
        var type = typeof(o);
        if (type === 'object') {
            if (o === null)
                return 'null';
            if (o.constructor && o.constructor.name)
                return o.constructor.name;
        }
        return type;
    }

    if (arguments.length == 1)
        expected = true;

    if (typeof actual === typeof expected) {
        if (actual === expected) {
            if (actual !== 0 || (1 / actual) === (1 / expected))
                return;
        }
        if (typeof actual === 'number') {
            if (isNaN(actual) && isNaN(expected))
                return true;
        }
        if (typeof actual === 'object') {
            if (actual !== null && expected !== null
            &&  actual.constructor === expected.constructor
            &&  actual.toString() === expected.toString())
                return;
        }
    }
    // Should output the source file and line number and extract
    //   the expression from the assert call
    throw_error("assertion failed: got " +
                get_full_type(actual) + ":|" + actual + "|, expected " +
                get_full_type(expected) + ":|" + expected + "|" +
                (message ? " (" + message + ")" : ""));
}

function assert_throws(expected_error, func)
{
    var err = false;
    try {
        func();
    } catch(e) {
        err = true;
        if (!(e instanceof expected_error)) {
            // Should output the source file and line number and extract
            //   the expression from the assert_throws() call
            throw_error("unexpected exception type");
            return;
        }
    }
    if (!err) {
        // Should output the source file and line number and extract
        //   the expression from the assert_throws() call
        throw_error("expected exception");
    }
}

function test_op1()
{
    var r, a;
    r = 1 + 2;
    assert(r, 3);

    r = 1 - 2;
    assert(r, -1);

    r = -1;
    assert(r, -1, "-1 === -1");

    r = +2;
    assert(r, 2, "+2 === 2");

    r = 2 * 3;
    assert(r, 6, "2 * 3 === 6");

    r = 4 / 2;
    assert(r, 2, "4 / 2 === 2");

    r = 4 % 3;
    assert(r, 1, "4 % 3 === 3");

    r = 4 << 2;
    assert(r, 16, "4 << 2 === 16");

    r = 1 << 0;
    assert(r, 1, "1 << 0 === 1");

    r = 1 << 29;
    assert(r, 536870912, "1 << 29 === 536870912");

    r = 1 << 30;
    assert(r, 1073741824, "1 << 30 === 1073741824");

    r = 1 << 31;
    assert(r, -2147483648, "1 << 31 === -2147483648");

    r = 1 << 32;
    assert(r, 1, "1 << 32 === 1");

    r = (1 << 31) < 0;
    assert(r, true, "(1 << 31) < 0 === true");

    r = -4 >> 1;
    assert(r, -2, "-4 >> 1 === -2");

    r = -4 >>> 1;
    assert(r, 0x7ffffffe, "-4 >>> 1 === 0x7ffffffe");

    r = -1 >>> 0;
    assert(r, 0xffffffff);

    r = 1 & 1;
    assert(r, 1, "1 & 1 === 1");

    r = 0 | 1;
    assert(r, 1, "0 | 1 === 1");

    r = 1 ^ 1;
    assert(r, 0, "1 ^ 1 === 0");

    r = ~1;
    assert(r, -2, "~1 === -2");

    r = !1;
    assert(r, false, "!1 === false");

    assert((1 < 2), true, "(1 < 2) === true");

    assert((2 > 1), true, "(2 > 1) === true");

    assert(('b' > 'a'), true, "('b' > 'a') === true");

    assert(2 ** 8, 256, "2 ** 8 === 256");

    /* minus zero */
    assert(1/(-0.0), -Infinity);
    a = 0;
    assert(1/(-a), -Infinity);
    assert(1/(0 * -6), -Infinity);

    /* 31 bit overflow */
    a = 0x3fffffff;
    assert(a + 1, 0x40000000);
    a = -0x40000000;
    assert(-a, 0x40000000);
}

function test_cvt()
{
    assert((NaN | 0), 0);
    assert((Infinity | 0), 0);
    assert(((-Infinity) | 0), 0);
    assert(("12345" | 0), 12345);
    assert(("0x12345" | 0), 0x12345);
    assert(((4294967296 * 3 - 4) | 0), -4);
    
    assert(("12345" >>> 0), 12345);
    assert(("0x12345" >>> 0), 0x12345);
    assert((NaN >>> 0), 0);
    assert((Infinity >>> 0), 0);
    assert(((-Infinity) >>> 0), 0);
    assert(((4294967296 * 3 - 4) >>> 0), (4294967296 - 4));
}

function test_eq()
{
    assert(null == undefined);
    assert(undefined == null);
    assert(true == 1);
    assert(0 == false);
    assert("" == 0);
    assert("123" == 123);
    assert("122" != 123);
//    assert((new Number(1)) == 1);
//    assert(2 == (new Number(2)));
//    assert((new String("abc")) == "abc");
//    assert({} != "abc");
}

function test_inc_dec()
{
    var a, r;
    
    a = 1;
    r = a++;
    assert(r === 1 && a === 2);

    a = 1;
    r = ++a;
    assert(r === 2 && a === 2);

    a = 1;
    r = a--;
    assert(r === 1 && a === 0);

    a = 1;
    r = --a;
    assert(r === 0 && a === 0);

    a = {x:true};
    a.x++;
    assert(a.x, 2, "++");

    a = {x:true};
    a.x--;
    assert(a.x, 0, "--");

    a = [true];
    a[0]++;
    assert(a[0], 2, "++");
    
    a = {x:true};
    r = a.x++;
    assert(r === 1 && a.x === 2);
    
    a = {x:true};
    r = a.x--;
    assert(r === 1 && a.x === 0);
    
    a = [true];
    r = a[0]++;
    assert(r === 1 && a[0] === 2);
    
    a = [true];
    r = a[0]--;
    assert(r === 1 && a[0] === 0);
}

function F(x)
{
    this.x = x;
}

function test_op2()
{
    var a, b;
    a = new Object;
    a.x = 1;
    assert(a.x, 1, "new");
    b = new F(2);
    assert(b.x, 2, "new");
    assert((b instanceof F), true, "instanceof F");

    a = {x : 2};
    assert(("x" in a), true, "in");
    assert(("y" in a), false, "in");

    a = {};
    assert((a instanceof Object), true, "instanceof Object");
    assert((a instanceof String), false, "instanceof String");

    assert((typeof 1), "number", "typeof");
    assert((typeof Object), "function", "typeof");
    assert((typeof null), "object", "typeof");
    assert((typeof unknown_var), "undefined", "typeof");
    
    a = {x: 1, y: 1};
    assert((delete a.x), true, "delete");
    assert(("x" in a), false, "delete in");

    a = {x: 1, if: 2};
    assert(a.if, 2);

    a = {x: 1, y: 2, __proto__: { z: 3 }};
    assert(a.x, 1);
    assert(a.y, 2);
    assert(Object.getPrototypeOf(a).z, 3);

    /* getter/setter/method */
    b = 2;
    a = {get x() { return b; }, set x(v) { b = v; }, f(v) { return v + 1 },
         set: 10, get: 11 };
    assert(a.x, 2);
    a.x = 3;
    assert(a.x, 3);
    assert(a.f(3), 4);
    assert(a.set, 10);
    assert(a.get, 11);

    a = { set() { return 1; }, get() { return 2; }}
    assert(a.set(), 1);
    assert(a.get(), 2);
}

function test_prototype()
{
    function f() { }
    assert(f.prototype.constructor, f, "prototype");
}

function test_arguments()
{
    function f2() {
        assert(arguments.length, 2, "arguments");
        assert(arguments[0], 1, "arguments");
        assert(arguments[1], 3, "arguments");
    }
    f2(1, 3);
}

function test_to_primitive()
{
    var obj;
    obj = { x : "abc", y: 1234 };
    obj.toString = function () { return this.x; };
    obj.valueOf = function () { return this.y; };
    assert(obj + "", "1234");
    assert(obj * 1, 1234);
}

function test_labels()
{
    do x: { break x; } while(0);
    if (1)
        x: { break x; }
    else
        x: { break x; }
    while (0) x: { break x; };
}

function test_labels2()
{
    while (1) label: break
    var i = 0
    while (i < 3) label: {
        if (i > 0)
            break
        i++
    }
    assert(i == 1)
    for (;;) label: break
    for (i = 0; i < 3; i++) label: {
        if (i > 0)
            break
    }
    assert(i == 1)
}

test_op1();
test_cvt();
test_eq();
test_inc_dec();
test_op2();
test_prototype();
test_arguments();
test_to_primitive();
test_labels();
test_labels2();
