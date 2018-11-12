    exports.Gpa  = { calPoints : 
    function (Grade,creditHours)
    { 
        var points=0;
        if ( Grade>100 || Grade<0 || creditHours>6 || creditHours<2 )
            return -1;
        else if ( Grade >=90 ) 
            points=4*creditHours;
        else if ( Grade >=80 ) 
            points=4*creditHours-1;
        else if ( Grade >=70 ) 
            points=4*creditHours-3;
        else if ( Grade >=60 )
            points=4*creditHours-6;
        else if ( Grade >=50 )
            points=4*creditHours-9;
        else points=0;
            return points;
    } };