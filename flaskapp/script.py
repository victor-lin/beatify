
import id3reader

# Construct a reader from a file or filename.
id3r = id3reader.Reader("static/tmp/01-Did-I.mp3")

# Ask the reader for ID3 values:
print id3r.getValue('title');

swag = id3r.getValue('title')