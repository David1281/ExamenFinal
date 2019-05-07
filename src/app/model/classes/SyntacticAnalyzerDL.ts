import { TokenTypes } from './../constants/TokenTypes';
import { SyntacticAnalyzer, Token } from 'k4ycer-syntactic-analyzer';


 var stack = {};
 let count = 0;
 let aux = 0;
            

export class SyntacticAnalyzerDL extends SyntacticAnalyzer{
    constructor(tokens: Token[]){        
        super(tokens);

        this.setInitialRule(this.Program);
    }



    private A(){
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                //stack.push({Father: "A", "State": "Def"});
                this.Def();
                //stack.push({Father: "A", "State": "A"});
                this.A();
                break;
            case TokenTypes.IntCKeyword:
                this.Def();
                //stack.push({Father: "A", "State": "A"});
                this.A();
                break;
            case TokenTypes.DoubleCKeyword:
                this.Def();
                //stack.push({Father: "A", "State": "A"});
                this.A();
                break;

            case TokenTypes.PesoToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
 
    private B(){
        //stack.push("B");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                return
            case TokenTypes.IdentifierC:
                return;
            case TokenTypes.IfCKeyword:
                return;
            case TokenTypes.CloseBraceCToken:
                return;
            case TokenTypes.DoubleCKeyword:
                this.Vardef();
                this.B();
                break;
            case TokenTypes.IntCKeyword:
                this.Vardef();
                this.B();
                break;    
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private C(){
        //stack.push("C");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                this.Stmt();
                this.C();
                break;
            case TokenTypes.IdentifierC:
                this.Stmt();
                this.C();
                break;
            case TokenTypes.IfCKeyword:
                this.Stmt();
                this.C();
                break;
            case TokenTypes.CloseBraceCToken:
                return;
            case TokenTypes.ReturnCKeyword:
                this.Stmt();
                this.C();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private D(){
        //stack.push("D");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                return;
            case TokenTypes.ElseCKeyword:
                return;
            case TokenTypes.ElseIfCKeyword:
                //stack.push(TokenTypes.ElseIfDingoKeyword);
                this.consume(TokenTypes.ElseIfCKeyword);
                //stack.push(TokenTypes.OpenParenDingoToken);
                this.consume(TokenTypes.OpenParenCToken);
                this.Expr();
                //stack.push(TokenTypes.CloseParenDingoToken);
                this.consume(TokenTypes.CloseParenCToken);
                //stack.push(TokenTypes.OpenBraceDingoToken);
                this.consume(TokenTypes.OpenBraceCToken);
                this.Stmtlist();
                //stack.push(TokenTypes.CloseBraceDingoToken);
                this.consume(TokenTypes.CloseBraceCToken);
                this.D();
                break;
            case TokenTypes.IdentifierC:
                return;
            case TokenTypes.IfCKeyword:
                return;
            case TokenTypes.CloseBraceCToken:
                return;
            case TokenTypes.ReturnCKeyword:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Def(){
        //stack.push("Def");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                //stack.push({Father: "Def", "State": "Fundef"});
                this.Fundef();
                break;
            case TokenTypes.DoubleCKeyword:
                //stack.push({Father: "Def", "State": "Vardef"});
                this.Vardef();
                break;
            case TokenTypes.IntCKeyword:
                //stack.push({Father: "Def", "State": "Vardef"});
                this.Vardef();
                break;    
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Deflist(){
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                count++;
                //stack.push({Father: "Deflist", "State": "A"});
                this.A();
                break;
            case TokenTypes.DoubleCKeyword:
                count++;
                //stack.push({Father: "Deflist", "State": "A"});
                this.A();
                break;
             case TokenTypes.IntCKeyword:
                count++;
                //stack.push({Father: "Deflist", "State": "A"});
                this.A();
                break;    
            case TokenTypes.PesoToken:
                count++;
                //stack.push({Father: "Deflist", "State": "A"});
                this.A();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private E(){
        //stack.push("E");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                return;
            case TokenTypes.CommaCToken:
                return;
            /*case TokenTypes.BarBarDingoToken:
                //stack.push(TokenTypes.BarBarDingoToken);
                this.consume(TokenTypes.BarBarDingoToken);
                this.Exprand();
                this.E();
                break;*/
            case TokenTypes.CloseParenCToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Else(){
        //stack.push("Else");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                return;   
            case TokenTypes.ElseCKeyword:
                //stack.push(TokenTypes.ElseIfDingoKeyword);
                this.consume(TokenTypes.ElseCKeyword);
                //stack.push(TokenTypes.OpenBraceDingoToken);
                this.consume(TokenTypes.OpenBraceCToken);
                this.Stmtlist();
                //stack.push(TokenTypes.CloseBraceDingoToken);
                this.consume(TokenTypes.CloseBraceCToken);
                break;
            case TokenTypes.IdentifierC:
                return;
            case TokenTypes.IfCKeyword:
                return;
            case TokenTypes.CloseBraceCToken:
                return;
            case TokenTypes.ReturnCKeyword:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Elseiflist(){
        //stack.push("Elseiflist");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                this.D();
                break;
            case TokenTypes.ElseCKeyword:
                this.D();
                break;
            case TokenTypes.ElseIfCKeyword:
                this.D();
                break;
            case TokenTypes.IdentifierC:
                this.D();
                break;
            case TokenTypes.IfCKeyword:
                this.D();
                break;
            case TokenTypes.CloseBraceCToken:
                this.D();
                break;
            case TokenTypes.ReturnCKeyword:
                this.D();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Expr(){
        //stack.push("Expr");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Expror();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Expror();
                break;
            case TokenTypes.OpenParenCToken:
                this.Expror();
                break;
            case TokenTypes.MinusCToken:
                this.Expror();
                break;
            case TokenTypes.PlusCToken:
                this.Expror();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Expradd(){
        //stack.push("Expradd");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Exprmul();
                this.I();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Exprmul();
                this.I();
                break;
            case TokenTypes.OpenParenCToken:
                this.Exprmul();
                this.I();
                break;
            case TokenTypes.MinusCToken:
                this.Exprmul();
                this.I();
                break;
            case TokenTypes.PlusCToken:
                this.Exprmul();
                this.I();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprand(){
        //stack.push("Exprand");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Exprcomp();
                this.F();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Exprcomp();
                this.F();
                break;
            case TokenTypes.StringLiteralDingo:
                this.Exprcomp();
                this.F();
                break;
            case TokenTypes.OpenParenCToken:
                this.Exprcomp();
                this.F();
                break;
            case TokenTypes.MinusCToken:
                this.Exprcomp();
                this.F();
                break;
            case TokenTypes.PlusCToken:
                this.Exprcomp();
                this.F();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprcomp(){
        //stack.push("Exprcomp");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Exprrel();
                this.G();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Exprrel();
                this.G();
                break;
            case TokenTypes.OpenParenCToken:
                this.Exprrel();
                this.G();
                break;
            case TokenTypes.MinusCToken:
                this.Exprrel();
                this.G();
                break;
            case TokenTypes.PlusCToken:
                this.Exprrel();
                this.G();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprlist(){
        //stack.push("Exprlist");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.OpenParenCToken:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.MinusCToken:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.PlusCToken:
                this.Expr();
                this.Exprlistcont();
                break;
            case TokenTypes.CloseParenCToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprlistcont(){
        //stack.push("Exprlistcont");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.CommaCToken:
                //stack.push(TokenTypes.CommaDingoToken);
                this.consume(TokenTypes.CommaCToken);
                this.Expr();
                this.Exprlistcont();
                break;

            case TokenTypes.CloseParenCToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprmul(){
        //stack.push("Exprmul");
        ///console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Exprunary();
                this.J();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Exprunary();
                this.J();
                break;
            case TokenTypes.OpenParenCToken:
                this.Exprunary();
                this.J();
                break;
            case TokenTypes.MinusCToken:
                this.Exprunary();
                this.J();
                break;
            case TokenTypes.PlusCToken:
                this.Exprunary();
                this.J();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Expror(){
        //stack.push("Expror");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Exprand();
                this.E();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Exprand();
                this.E();
                break;
            case TokenTypes.OpenParenCToken:
                this.Exprand();
                this.E();
                break;
            case TokenTypes.MinusCToken:
                this.Exprand();
                this.E();
                break;
            case TokenTypes.PlusCToken:
                this.Exprand();
                this.E();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprprimary(){
        //stack.push("Exprprimary");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                //stack.push(TokenTypes.IdentifierDingo);
                this.consume(TokenTypes.IdentifierC);
                this.ExprprimaryP();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Lit();
                break;
            case TokenTypes.OpenParenCToken:
                //stack.push(TokenTypes.OpenParenDingoToken);
                this.consume(TokenTypes.OpenParenCToken);
                this.Expr();
                //stack.push(TokenTypes.CloseParenDingoToken);
                this.consume(TokenTypes.CloseParenCToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private ExprprimaryP(){
        //stack.push("Exprprimary");
        ///console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                return;
            /*case TokenTypes.AmpersandAmpersandCToken:
                return;*/
            case TokenTypes.AsteriskCToken:
                return;
            case TokenTypes.CommaCToken:
                return;
            case TokenTypes.EqualsEqualsCToken:
                return;
            case TokenTypes.GreaterThanCToken:
                return;
            case TokenTypes.LessThanCToken:
                return;
            case TokenTypes.OpenParenCToken:
                //stack.push(TokenTypes.OpenParenDingoToken);
                this.consume(TokenTypes.OpenParenCToken);
                this.Exprlist();
                //stack.push(TokenTypes.CloseParenDingoToken);
                this.consume(TokenTypes.CloseParenCToken);
                break;
            case TokenTypes.MinusCToken:
                return;
            /*case TokenTypes.BarBarDingoToken:
                return;*/

            case TokenTypes.PlusCToken:
                return;
            case TokenTypes.CloseParenCToken:
                return;
            case TokenTypes.SlashCToken:
                return;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprrel(){
        //stack.push("Exprrel");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Expradd();
                this.H();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Expradd();
                this.H();
                break;
            case TokenTypes.StringLiteralDingo:
                this.Expradd();
                this.H();
                break;
            case TokenTypes.OpenParenCToken:
                this.Expradd();
                this.H();
                break;
            case TokenTypes.MinusCToken:
                this.Expradd();
                this.H();
                break;
            case TokenTypes.PlusCToken:
                this.Expradd();
                this.H();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Exprunary(){
        //stack.push("Exprunary");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Exprprimary();
                break;
            case TokenTypes.IntegerLiteralC:
                this.Exprprimary();
                break;
            case TokenTypes.OpenParenCToken:
                this.Exprprimary();
                break;
            case TokenTypes.MinusCToken:
                this.Opunary();
                this.Exprunary();
                break;
            case TokenTypes.PlusCToken:
                this.Opunary();
                this.Exprunary();
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    // Funciones Dave:

    
    private F(){
        //stack.push("F");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
            case TokenTypes.CommaCToken:
            /*case TokenTypes.BarBarDingoToken:*/
            case TokenTypes.CloseParenCToken:
            return;

            /*case TokenTypes.AmpersandAmpersandDingoToken:
                //stack.push(TokenTypes.AmpersandAmpersandDingoToken);
                this.consume(TokenTypes.AmpersandAmpersandDingoToken);
                this.Exprcomp();
                this.F();
                break;*/
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Funcall(){
        //stack.push("Funcall");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                //stack.push(TokenTypes.IdentifierDingo);
                this.consume(TokenTypes.IdentifierC);
                //stack.push(TokenTypes.OpenParenDingoToken);
                this.consume(TokenTypes.OpenParenCToken);
                this.Exprlist();
                //stack.push(TokenTypes.CloseParenDingoToken);
                this.consume(TokenTypes.CloseParenCToken);
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Fundef(){
        //stack.push("Fundef");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                //stack.push(TokenTypes.IdentifierDingo);
                this.consume(TokenTypes.IdentifierC);
                //stack.push(TokenTypes.OpenParenDingoToken);
                this.consume(TokenTypes.OpenParenCToken);
                this.Paramlist();
                //stack.push(TokenTypes.CloseParenDingoToken);
                this.consume(TokenTypes.CloseParenCToken);
                //stack.push(TokenTypes.OpenBraceDingoToken);
                this.consume(TokenTypes.OpenBraceCToken);
                this.Vardeflist();
                this.Stmtlist();
                //stack.push(TokenTypes.CloseParenDingoToken);
                this.consume(TokenTypes.CloseBraceCToken)
                break;
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private G(){
        //stack.push("G");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
            //case TokenTypes.AmpersandAmpersandDingoToken:
            case TokenTypes.CommaCToken:
            /*case TokenTypes.BarBarDingoToken:
            case TokenTypes.CloseBracketDingoToken:*/
            case TokenTypes.CloseParenCToken:
                return;
            case TokenTypes.EqualsEqualsCToken:
                this.Opcomp();
                this.Exprrel();
                this.G();
                break;    
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private H(){
        //stack.push("H");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
            //case TokenTypes.AmpersandAmpersandDingoToken:
            case TokenTypes.CommaCToken:
            //case TokenTypes.ExclamationEqualsDingoToken:
            case TokenTypes.EqualsEqualsCToken:
            //case TokenTypes.BarBarDingoToken:
            //case TokenTypes.CloseBracketDingoToken:
            case TokenTypes.CloseParenCToken:
                return;
            case TokenTypes.GreaterThanCToken:
                this.Oprel();
                this.Expradd();
                this.H();
                break;
            case TokenTypes.LessThanCToken:
                this.Oprel();
                this.Expradd();
                this.H();
                break;  

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private I(){
        //stack.push("I");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
            //case TokenTypes.AmpersandAmpersandDingoToken:
            case TokenTypes.CommaCToken:
            //case TokenTypes.ExclamationEqualsDingoToken:
            case TokenTypes.EqualsEqualsCToken:
            case TokenTypes.GreaterThanCToken:
            //case TokenTypes.GreaterThanEqualsDingoToken:
            case TokenTypes.LessThanCToken:
            //case TokenTypes.LessThanEqualsDingoToken:
            //case TokenTypes.BarBarDingoToken:
            //case TokenTypes.CloseBracketDingoToken:
            case TokenTypes.CloseParenCToken:
                return;
            case TokenTypes.PlusCToken:
                this.Opadd();
                this.Exprmul();
                this.I();
                break;
            case TokenTypes.MinusCToken:
                this.Opadd();
                this.Exprmul();
                this.I();
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }


    private Id(){
        //stack.push("Id");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                //stack.push(TokenTypes.IdentifierDingo);
                this.consume(TokenTypes.IdentifierC);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Idlist(){
        //stack.push("Idlist");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Id();
                this.Idlistcont();
                break;
                
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Idlistcont(){
        //stack.push("Idlistcont");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.CloseParenCToken:
            case TokenTypes.SemicolonCToken:
                return;
            case TokenTypes.CommaCToken:    
                //stack.push(TokenTypes.CommaDingoToken);
                this.consume(TokenTypes.CommaCToken);
                //stack.push(TokenTypes.IdentifierDingo);
                this.consume(TokenTypes.IdentifierC);
                this.Idlistcontp();
                break;
                
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Idlistcontp(){
        //stack.push("Idlistcont");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.CloseParenCToken:
                this.Idlistcont();
                break;
            case TokenTypes.SemicolonCToken:
                this.Idlistcont();
                break;
            case TokenTypes.CommaCToken:    
                this.Idlistcont();
                break;
            case TokenTypes.EqualsCToken:
                this.consume(TokenTypes.EqualsCToken);
                this.Idlistcont(); 
                break;   
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }


    private J(){
        //stack.push("J");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
            //case TokenTypes.AmpersandAmpersandDingoToken:            
            case TokenTypes.CommaCToken: 
            //case TokenTypes.ExclamationEqualsDingoToken:
            case TokenTypes.EqualsEqualsCToken:
            case TokenTypes.GreaterThanCToken:
            //case TokenTypes.GreaterThanEqualsDingoToken:
            case TokenTypes.LessThanCToken:
            //case TokenTypes.LessThanEqualsDingoToken:  
            case TokenTypes.MinusCToken:
            case TokenTypes.PlusCToken:
            //case TokenTypes.BarBarDingoToken:
            //case TokenTypes.CloseBracketDingoToken:
            case TokenTypes.CloseParenCToken:
                return;

            case TokenTypes.AsteriskCToken:
                this.Opmul();
                this.Exprunary();
                this.J();
                break;

            /*case TokenTypes.PercentDingoToken:    
                this.Opmul();
                this.Exprunary();
                this.J();
                break;*/
            case TokenTypes.SlashCToken:    
                this.Opmul();
                this.Exprunary();
                this.J();
                break;

                
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Lit(){
        //stack.push("Lit");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IntegerLiteralC:
                //stack.push(TokenTypes.IdentifierDingo);
                this.consume(TokenTypes.IntegerLiteralC);
                break;        
                
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Opadd(){
        //stack.push("Opadd");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.MinusCToken:
            //stack.push(TokenTypes.MinusDingoToken);
                this.consume(TokenTypes.MinusCToken);
                break;
            case TokenTypes.PlusCToken:
            //stack.push(TokenTypes.PlusDingoToken);
                this.consume(TokenTypes.PlusCToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Opcomp(){
        //stack.push("Opcomp");
        //console.log(stack);
        switch(this.currentToken.type){
    
            case TokenTypes.EqualsEqualsCToken:
                //stack.push(TokenTypes.EqualsEqualsDingoToken);
                this.consume(TokenTypes.EqualsEqualsCToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Opmul(){
        //stack.push("Opmul");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.AsteriskCToken:
                //stack.push(TokenTypes.AsteriskDingoToken);
                this.consume(TokenTypes.AsteriskCToken);
                break;

            case TokenTypes.SlashCToken:
            //stack.push(TokenTypes.SlashDingoToken);
                this.consume(TokenTypes.SlashCToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Oprel(){
        //stack.push("Oprel");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.GreaterThanCToken:
                //stack.push(TokenTypes.GreaterThanDingoToken);
                this.consume(TokenTypes.GreaterThanCToken);
                break;
         
            case TokenTypes.LessThanCToken:
            //stack.push(TokenTypes.LessThanDingoToken);
                this.consume(TokenTypes.LessThanCToken);
                break;
          
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Opunary(){
        //stack.push("Opunary");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.MinusCToken:
                //stack.push(TokenTypes.MinusDingoToken);
                this.consume(TokenTypes.MinusCToken);
                break;
            case TokenTypes.PlusCToken:
                //stack.push(TokenTypes.PlusDingoToken);
                this.consume(TokenTypes.PlusCToken);
                break;
        
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Paramlist(){
        //stack.push("Paramlist");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                //stack.push(TokenTypes.IdentifierDingo);
                this.consume(TokenTypes.IdentifierC);
                this.Idlistcont();
                break;
            case TokenTypes.CloseParenCToken:
                return;
        
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Program(){
        Object.defineProperty(stack, 'Root', { value: 'Program' });
       
         //console.log(stack);

        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
               //Object.defineProperty(Program, 'Root', { value: 'Program' });                this.Deflist();
                this.Deflist();
                break;
            case TokenTypes.DoubleCKeyword:
                //stack.push({Father: "Program", "State": "Deflist"});
                this.Deflist();
                break; 
            case TokenTypes.IntCKeyword:
                //stack.push({Father: "Program", "State": "Deflist"});
                this.Deflist();
                break;
            case TokenTypes.PesoToken:
                //stack.push({Father: "Program", "State": "Deflist"});
                this.Deflist();
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }

        console.log(stack);
    }

    private Stmt(){
        //stack.push("Stmt");
       // console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                this.Stmtempt();
                break;
            case TokenTypes.IdentifierC:
                this.consume(TokenTypes.IdentifierC);
                this.Stmtp();
                break;
            case TokenTypes.IfCKeyword:
                this.Stmtif();
                break;
            case TokenTypes.ReturnCKeyword:
                this.Stmtreturn();
                break;             
                    
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtp(){
        //stack.push("Stmtp");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.EqualsCToken:
            //stack.push(TokenTypes.EqualsDingoToken);
                this.consume(TokenTypes.EqualsCToken);
                this.Expr();
                break;
            case TokenTypes.OpenParenCToken:
            //stack.push(TokenTypes.OpenParenDingoToken);
                this.consume(TokenTypes.OpenParenCToken);
                this.Exprlist();
                //stack.push(TokenTypes.CloseParenDingoToken);
                this.consume(TokenTypes.CloseParenCToken);
                break;
            case TokenTypes.PlusPlusCToken:
                //stack.push(TokenTypes.PlusPlusDingoToken);
                this.consume(TokenTypes.PlusPlusCToken);
                //stack.push(TokenTypes.SemicolonDingoToken);
                this.consume(TokenTypes.SemicolonCToken);
                break;
            case TokenTypes.MinusMinusCToken:
            //stack.push(TokenTypes.MinusMinusDingoToken);
                this.consume(TokenTypes.MinusMinusCToken);
                //stack.push(TokenTypes.SemicolonDingoToken);
                this.consume(TokenTypes.SemicolonCToken);
                break;    
                    
                    
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtdecr(){
        //stack.push("Stmtdecr");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
            //stack.push(TokenTypes.IdentifierDingo);
                this.consume(TokenTypes.IdentifierC);
                //stack.push(TokenTypes.MinusMinusDingoToken);
                this.consume(TokenTypes.MinusMinusCToken);
                //stack.push(TokenTypes.SemicolonDingoToken);
                this.consume(TokenTypes.SemicolonCToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtempt(){
        //stack.push("Stmtempt");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                //stack.push(TokenTypes.SemicolonDingoToken);
                this.consume(TokenTypes.SemicolonCToken);
                break;
                                            
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtfuncall(){
        //stack.push("Stmtfuncall");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Funcall();
                //stack.push(TokenTypes.SemicolonDingoToken);
                this.consume(TokenTypes.SemicolonCToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtif(){
        //stack.push("Stmtif");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IfCKeyword:
            //stack.push(TokenTypes.IfDingoKeyword);
                this.consume(TokenTypes.IfCKeyword);
                //stack.push(TokenTypes.OpenParenDingoToken);
                this.consume(TokenTypes.OpenParenCToken);
                this.Expr();
                //stack.push(TokenTypes.CloseParenDingoToken);
                this.consume(TokenTypes.CloseParenCToken);
                //stack.push(TokenTypes.OpenBraceDingoToken);
                this.consume(TokenTypes.OpenBraceCToken);
                this.Stmtlist();
                //stack.push(TokenTypes.CloseBraceDingoToken);
                this.consume(TokenTypes.CloseBraceCToken);
                this.Elseiflist();
                this.Else();
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtincr(){
        //stack.push("Stmtincr");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Id();
                 //stack.push(TokenTypes.PlusPlusDingoToken);
                this.consume(TokenTypes.PlusPlusCToken);
                 //stack.push(TokenTypes.SemicolonDingoToken);
                this.consume(TokenTypes.SemicolonCToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Stmtlist(){
        //stack.push("Stmtlist");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                this.C();
                break;
            case TokenTypes.IdentifierC:
                this.C();
                break;
            case TokenTypes.IfCKeyword:
                this.C();
                break;
            case TokenTypes.CloseBraceCToken:
                this.C();
                break;
            case TokenTypes.ReturnCKeyword:
                this.C();
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }


    private Stmtreturn(){
        //stack.push("Stmtreturn");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.ReturnCKeyword:
            //stack.push(TokenTypes.ReturnDingoKeyword);
                this.consume(TokenTypes.ReturnCKeyword);
                this.Expr();
                //stack.push(TokenTypes.SemicolonDingoToken);
                this.consume(TokenTypes.SemicolonCToken);
                break;

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Vardef(){
        //stack.push("Vardef");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.DoubleCKeyword:
                this.consume(TokenTypes.DoubleCKeyword);
                this.Vardefpp();
                break;
             case TokenTypes.IntCKeyword:
                this.consume(TokenTypes.IntCKeyword);
                this.Vardefp();
                break;    
           
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

     private Vardefp(){
        //stack.push("Vardef");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.EqualsCToken:
                this.consume(TokenTypes.EqualsCToken);
                this.Varlist();
                this.consume(TokenTypes.SemicolonCToken);
                break;
             case TokenTypes.IntCKeyword:
                this.Varlist();
                this.consume(TokenTypes.SemicolonCToken);
                break;    
           
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

       private Vardefpp(){
        //stack.push("Vardef");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.EqualsCToken:
                this.consume(TokenTypes.EqualsCToken);
                this.Varlist();
                this.consume(TokenTypes.SemicolonCToken);
                break;
             case TokenTypes.IntCKeyword:
                this.Varlist();
                this.consume(TokenTypes.SemicolonCToken);
                break;    
           
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Vardeflist(){
        //stack.push("Vardeflist");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.SemicolonCToken:
                this.B();
                break;

            case TokenTypes.IdentifierC:
                this.B();
                break;
            case TokenTypes.IfCKeyword:
                this.B();
                break;
            case TokenTypes.CloseBraceCToken:
                this.B();
                break;
            case TokenTypes.ReturnCKeyword:
                this.B();
                break;
            case TokenTypes.DoubleCKeyword:
                this.B();
                break;
            case TokenTypes.IntCKeyword:
                this.B();
                break;    

            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }

    private Varlist(){
        //stack.push("Varlist");
        //console.log(stack);
        switch(this.currentToken.type){
            case TokenTypes.IdentifierC:
                this.Idlist();
                break;
            
            default:
                throw new Error(`Token "${this.currentToken.value}" inválido en la linea ${this.currentToken.line}, columna ${this.currentToken.column}`);
        }
    }
        
}