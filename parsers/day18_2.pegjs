MulExpr
  = head:AddExpr tail:(_ "*" _ AddExpr)* {
      return tail.reduce((a, element) => element[3] ? a * element[3] : a, head);
    }
    
AddExpr
  = head:Expression tail:(_ "+" _ Expression)* {
      return tail.reduce((a, element) => element[3] ? a + element[3] : a, head);
    }

Expression
  = "(" _ expr:MulExpr _ ")" { return expr; }
  / Integer

Integer
  = [0-9]+ { return parseInt(text(), 10); }

_
  = [ \t\n\r]*