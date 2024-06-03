function Square(color,id,piece)
{
    return{color : color, id : id, piece : piece, highlighted: false}    // i could also write color:color instead of color . enhanced object literals.
}


function SquareRow(RowId)
{
    const SquareRow = [];
    const abcd = ['a','b','c','d','e','f','g','h'];
    if(RowId % 2==0)
    {
        abcd.forEach((element,index) => {
            
            if(index % 2 ==1)
            {
                SquareRow.push(Square("black", element + RowId ,"null"));   //green
            }
            else{
                SquareRow.push(Square("white", element + RowId ,"null"));   //cream
            }
        });  
    }
    else
    {
        abcd.forEach((element,index) => {
            if(index % 2 ==1)
            {
                SquareRow.push(Square("white", element + RowId ,"null"));
            }
            else{
                SquareRow.push(Square("black", element + RowId ,"null")); 
            }
        });
    }
    return SquareRow;
}

export function initGame()
{
    const board = [];
    for(let i=8 ; i>=1; i--)
    {
        board.push(SquareRow(i));
    }
    return board;
}

//console.log(initGame());


