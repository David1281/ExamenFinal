export enum TokenTypes{
    //Keywords
    BreakDingoKeyword,
    ElseCKeyword,
    //ElseIfDingoKeyword,
    IfCKeyword,
    //LoopDingoKeyword,
    ReturnCKeyword,
    //VarDingoKeyword,
    ForCKeyword,

    //Operators
    MinusCToken,
    MinusMinusCToken,
    PlusCToken,
    PlusPlusCToken,
    AsteriskCToken,
    SlashCToken,
    ElseIfCKeyword,
    //AmpersandAmpersandDingoToken,
    //BarBarDingoToken,
    EqualsEqualsCToken, 
    EqualsCToken,
    //ExclamationEqualsDingoToken,
    GreaterThanCToken,
    LessThanCToken,
    //GreaterThanEqualsCToken,
    //LessThanEqualsCToken,

    //Literals
    IntegerLiteralC,
    CharacterLiteralDingo,
    StringLiteralDingo,

     //Identifiers
    IdentifierC,

    OpenParenCToken,
    OpenBraceCToken,
    CloseBraceCToken,
    CloseParenCToken,
    //OpenBracketDingoToken,
    //CloseBracketDingoToken,
    DotCToken,
    ColonCToken,
    SemicolonCToken,
    CommaCToken,

    //Comments
    SingleLineCommentTriviaDingo,
    MultiLineCommentTriviaDingo,

    // Others
    PesoToken,
    EndOfFileToken,
    WhiteSpace,
    NewLineTrivia,
    DoubleCKeyword,
    IntCKeyword,
    VoidCKeyword,
}