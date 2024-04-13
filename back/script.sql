    PRAGMA foreign_keys = ON;

    CREATE TABLE  Equipment (
        euipmentID v PRIMARY KEY,
        Sigla varchar(50),
        NomePartido varchar(50),
        Logo varchar(300)
    );

    CREATE TABLE Deputado (
        idDeputado INTEGER PRIMARY KEY,
        NomeDeputado varchar(50),
        Cpf varchar(12),
        Sexo varchar(2),
        Foto varchar(300),
        Uf varchar(10),
        fk_Partido_id INTEGER,
        FOREIGN KEY (fk_Partido_id) REFERENCES Partido (idPartido) ON DELETE CASCADE
    );

    