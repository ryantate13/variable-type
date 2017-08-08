var VT = require('./');
var expect = require('expect');

describe('variable-type', function() {
  it(' - bool', function() {
    expect(VT.check(true, VT.bool)).toBe(true);
    expect(VT.check(false, VT.bool)).toBe(true);
    expect(VT.check(undefined, VT.bool)).toBe(false);
    expect(VT.check('1', VT.bool)).toBe(false);
    expect(VT.check(null, VT.bool)).toBe(false);
  });

  it(' - func', function() {
    expect(VT.check(Math.pow, VT.func)).toBe(true);
    expect(VT.check(function _test() {}, VT.func)).toBe(true);
    expect(VT.check(undefined, VT.func)).toBe(false);
    expect(VT.check(1.2, VT.func)).toBe(false);
    expect(VT.check('1', VT.func)).toBe(false);
    expect(VT.check(null, VT.func)).toBe(false);
  });

  it(' - number', function() {
    expect(VT.check(1, VT.number)).toBe(true);
    expect(VT.check(1.2, VT.number)).toBe(true);
    expect(VT.check(undefined, VT.number)).toBe(false);
    expect(VT.check('1', VT.number)).toBe(false);
    expect(VT.check(null, VT.number)).toBe(false);
  });

  it(' - string', function() {
    expect(VT.check('1', VT.string)).toBe(true);
    expect(VT.check('variable-type', VT.string)).toBe(true);
    expect(VT.check(undefined, VT.string)).toBe(false);
    expect(VT.check(1, VT.string)).toBe(false);
    expect(VT.check(null, VT.string)).toBe(false);
  });

  it(' - instanceOf', function() {
    expect(VT.check(new Date(), VT.instanceOf(Date))).toBe(true);
    expect(VT.check(undefined, VT.instanceOf(Date))).toBe(false);
    expect(VT.check('1', VT.instanceOf(Date))).toBe(false);
    expect(VT.check(null, VT.instanceOf(Date))).toBe(false);
  });

  it(' - object', function() {
    expect(VT.check({}, VT.object)).toBe(true);
    expect(VT.check(undefined, VT.object)).toBe(false);
    expect(VT.check('1', VT.object)).toBe(false);
    expect(VT.check(null, VT.object)).toBe(false);
  });

  it(' - array', function() {
    expect(VT.check([], VT.array)).toBe(true);
    expect(VT.check(undefined, VT.array)).toBe(false);
    expect(VT.check('1', VT.array)).toBe(false);
    expect(VT.check(null, VT.array)).toBe(false);
  });

  it(' - undefined', function() {
    expect(VT.check(undefined, VT.undefined)).toBe(true);
    expect(VT.check(null, VT.undefined)).toBe(false);
    expect(VT.check(1, VT.undefined)).toBe(false);
    expect(VT.check('str', VT.undefined)).toBe(false);
  });

  it(' - null', function() {
    expect(VT.check(undefined, VT.null)).toBe(false);
    expect(VT.check(null, VT.null)).toBe(true);
    expect(VT.check(1, VT.null)).toBe(false);
    expect(VT.check('str', VT.null)).toBe(false);
  });

  it(' - oneOf', function() {
    expect(VT.check('a', VT.oneOf(['a', 1]))).toBe(true);
    expect(VT.check(1, VT.oneOf(['a', 1]))).toBe(true);
    expect(VT.check('1', VT.oneOf(['a', 1]))).toBe(false);
    expect(VT.check(undefined, VT.oneOf(['a', 1]))).toBe(false);
    expect(VT.check(new Date(), VT.oneOf(['a', 1]))).toBe(false);

    // except cases
    expect(VT.check(null, VT.oneOf(['a', 1]))).toBe(false);
    expect(VT.check(undefined, VT.oneOf(['a', 1]))).toBe(false);
    expect(VT.check(new Date(), VT.oneOf(['a', 1]))).toBe(false);
  });

  it(' - any', function() {
    expect(VT.check('a', VT.any)).toBe(true);
    expect(VT.check(1, VT.any)).toBe(true);
    expect(VT.check(undefined, VT.any)).toBe(true);
    expect(VT.check(new Date(), VT.any)).toBe(true);
  });

  it(' - oneOfType', function() {
    expect(VT.check('a', VT.oneOfType([
      VT.number
    ]))).toBe(false);

    expect(VT.check('a', VT.oneOfType([
      VT.number,
      VT.string
    ]))).toBe(true);

    expect(VT.check(new Date(), VT.oneOfType([
      VT.number,
      VT.string,
      VT.instanceOf(Date)
    ]))).toBe(true);

    // except cases
    expect(VT.check(null, VT.oneOfType([
      VT.number
    ]))).toBe(false);

    expect(VT.check(undefined, VT.oneOfType([
      VT.number
    ]))).toBe(false);

    expect(VT.check(new Date(), VT.oneOfType([
      VT.number
    ]))).toBe(false);
  });

  it(' - or', function() {
    expect(VT.check('a', VT.or([
      VT.number
    ]))).toBe(false);

    expect(VT.check('a', VT.or([
      VT.number,
      VT.string
    ]))).toBe(true);

    expect(VT.check(new Date(), VT.or([
      VT.number,
      VT.string,
      VT.instanceOf(Date)
    ]))).toBe(true);

    // except cases
    expect(VT.check(null, VT.or([
      VT.number
    ]))).toBe(false);

    expect(VT.check(undefined, VT.or([
      VT.number
    ]))).toBe(false);

    expect(VT.check(new Date(), VT.or([
      VT.number
    ]))).toBe(false);
  });

  it(' - and', function() {
    expect(VT.check('a', VT.and([
      VT.number
    ]))).toBe(false);

    expect(VT.check('a', VT.and([
      VT.string
    ]))).toBe(true);

    expect(VT.check('a', VT.and([
      VT.string,
      VT.oneOf(['a', 'b'])
    ]))).toBe(true);

    // except cases
    expect(VT.check(null, VT.and([
      VT.number
    ]))).toBe(false);

    expect(VT.check(undefined, VT.and([
      VT.number
    ]))).toBe(false);

    expect(VT.check(new Date(), VT.and([
      VT.number
    ]))).toBe(false);
  });

  it(' - arrayOf', function() {
    expect(VT.check([1, 2, 3], VT.arrayOf(VT.number))).toBe(true);
    expect(VT.check(['1', '2'], VT.arrayOf(VT.string))).toBe(true);
    expect(VT.check([new Date()], VT.arrayOf(VT.instanceOf(Date)))).toBe(true);
    expect(VT.check(['1', 2], VT.arrayOf(VT.string))).toBe(false);
    expect(VT.check(['1', 2], VT.arrayOf(VT.func))).toBe(false);

    // except cases
    expect(VT.check(null, VT.arrayOf(VT.func))).toBe(false);
    expect(VT.check(undefined, VT.arrayOf(VT.func))).toBe(false);
    expect(VT.check(1, VT.arrayOf(VT.func))).toBe(false);
    expect(VT.check('hello', VT.arrayOf(VT.func))).toBe(false);
    expect(VT.check(new Date(), VT.arrayOf(VT.func))).toBe(false);
  });

  it(' - shape', function() {
    expect(VT.check({
      a: true,
      b: 1,
      c: 'str',
      d: function() {},
      e: new Date(),
      f: '1'
    }, VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date),
      f: VT.oneOf([1, '1'])
    }))).toBe(true);

    expect(VT.check({
      a: true,
      c: 'str',
      e: new Date()
    }, VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date)
    }))).toBe(false);

    expect(VT.check({
      a: true,
      c: 123,
      e: new Date()
    }, VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date)
    }))).toBe(false);

    expect(VT.check({
      name: 'hustcc',
      boy: true,
      birthday: new Date(1992, 8, 1)
    }, VT.shape({
      name: VT.string,
      boy: VT.bool,
      birthday: VT.instanceOf(Date)
    }))).toBe(true);

    // except case
    expect(VT.check(null, VT.shape({
      name: VT.string
    }))).toBe(false);

    expect(VT.check(undefined, VT.shape({
      name: VT.string
    }))).toBe(false);

    expect(VT.check(new Date(), VT.shape({
      name: VT.string
    }))).toBe(false);
  });

  it(' - complex usage', function() {
    expect(VT.check({
      a: true,
      b: 1,
      c: 'str',
      d: function() {},
      e: new Date(),
      f: '1',
      g: {
        h: {
          i: [
            '1',
            2,
            true,
            {
              j: function() {},
              k: null
            }
          ]
        }
      }
    }, VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date),
      f: VT.oneOf([1, '1']),
      g: VT.shape({
        h: VT.oneOfType([
          VT.shape({
            i: VT.arrayOf(
              VT.oneOfType([
                VT.number,
                VT.string,
                VT.bool,
                VT.shape({
                  j: VT.func,
                  k: VT.null,
                  l: VT.undefined
                })
              ])
            )
          })
        ])
      })
    }))).toBe(true);

    expect(VT.check({
      a: true,
      b: 1,
      c: 'str',
      d: function() {},
      e: new Date(),
      f: '1',
      g: {
        h: {
          i: [
            '1',
            2,
            true,
            {
              j: 1
            }
          ]
        }
      }
    }, VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date),
      f: VT.oneOf([1, '1']),
      g: VT.shape({
        h: VT.oneOfType([
          VT.shape({
            i: VT.arrayOf(
              VT.oneOfType([
                VT.number,
                VT.string,
                VT.bool,
                VT.shape({
                  j: VT.func
                })
              ])
            )
          })
        ])
      })
    }))).toBe(false);
  });

  it(' - exception will return false', function() {
    expect(VT.check([1, 2, 3], null)).toBe(false);
  });
});