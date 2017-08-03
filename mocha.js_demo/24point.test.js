// npm install --global mocha;   npm install --global chai;
var searchExpression = require('./24point.js');
var expect = require('chai').expect;

describe('计算24点的测试', function() {
  it('输入：3 3 6 6 ；输出：((6/3)+6)*3 = 24', function() {
    expect(searchExpression(24, [3,3,6,6])).to.be.deep.equal(["((6/3)+6)*3=24"]);
  });
  it('输入：3 2 3 4 ；输出：无解', function() {
    expect(searchExpression(24, [3,2,3,4])).to.be.deep.equal(["无解"]);
  });
  it('输入：5 5 6 6 ；输出：((5+5)-6)*6 = 24、(5*5)-(6/6) = 24、((5-6)+5)*6 = 24、(5-(6-5))*6 = 24、(6-(6/5))*5 = 24', function() {
    expect(searchExpression(24, [5,5,6,6])).to.be.deep.equal(['((5+5)-6)*6=24','(5*5)-(6/6)=24','((5-6)+5)*6=24','(5-(6-5))*6=24','(6-(6/5))*5=24']);
  });
});
