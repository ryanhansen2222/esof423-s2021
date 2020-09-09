-- Select all albums with a total size over 1Mb
SELECT title
FROM albums
WHERE 10000000 > (SELECT SUM(bytes)
    FROM tracks
WHERE tracks.AlbumId = albums.AlbumId) ;

SELECT SUM(bytes)
FROM tracks
WHERE tracks.AlbumId = 1;

-- Denormalized query
SELECT title
FROM albums
WHERE 10000000 > albums.bytes;

-- Move condition into subquery
SELECT albums.title
FROM albums
WHERE albums.AlbumId IN
      (SELECT AlbumId FROM tracks
       GROUP BY AlbumId
    HAVING  10000000 > SUM(tracks.Bytes));
