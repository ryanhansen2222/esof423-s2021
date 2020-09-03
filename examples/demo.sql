SELECT artists.name, albums.Title
FROM artists
LEFT OUTER JOIN albums ON artists.ArtistId = albums.ArtistId
