SELECT 1 + 1;

select 1 + 1;

SELECT TrackId,
       Name,
       Composer,
       UnitPrice
FROM tracks;

SELECT *
FROM tracks;

SELECT name
FROM tracks
WHERE Milliseconds > 3 * 60 * 1000;

SELECT name
FROM tracks
WHERE AlbumId = 1;

SELECT name
FROM tracks
WHERE AlbumId = 1 AND Milliseconds > 3 * 60 * 1000;

