AddMul
  = head:Expression tail:(_ ("+" / "*") _ Expression)* {
      return tail.reduce((a, element) => {
      	if (element[1] == '+') return a + element[3];
      	if (element[1] == '*') return a * element[3];
      }, head);
    }

Expression
  = "(" _ expr:AddMul _ ")" { return expr; }
  / Integer

Integer
  = [0-9]+ { return parseInt(text(), 10); }

_
  = [ \t\n\r]*