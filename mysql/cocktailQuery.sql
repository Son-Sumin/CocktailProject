show tables;

LOAD DATA INFILE 'C:\CocktailProject\mysql\data\cocktail.csv'
    INTO TABLE cocktail
    FIELDS
        TERMINATED BY ','
        OPTIONALLY ENCLOSED BY '"'
    (`field1`, `field2`, `field3`);

select * from cocktail;