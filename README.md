# Hit Combo Factory
[Hit Combo Factory](http://cosmitar.github.io/hit-combo-factory/) is a crafter for an always-comfortable playlist using Spotify API.
Select the artists and you'll get two tracks of each artist on the list.
[Try this work-in-progress example](http://cosmitar.github.io/hit-combo-factory/)

##Why two tracks? 
**It's the perfect balance**

if you LOVE the artist, ensures more than one song, cool!

if you're ok with the artist, two songs are enough, yeah!

if you don't like the artist, better remove him/her from the playlist

##Combos has types
You can choose from a combination of
- Trending (default): new and popular song.
- Classic: oldie and popular song. (WIP)
- HIT: a popular song of a couple of years ago. (WIP)
- Discovery: new and not yet popular song. (WIP)

##Additional functionality
- You can let Hit Combo Factory suggest you artists related with current selection.
- Remove a song and Hit Combo Factory will find another one from that artist for you.
- Export the playlist to your Spotify account.
- We can suggest you the playlist name :D
- Get some inspirational messages XD
- Preview the resultant playlist (WIP).


##Artist suggestion algorithm
1- Take artists from the current list (at least 1).
2- Collect the related artist for the artists of step 1, avoiding duplicated and excluding the ones removed by user.
3- Order the collection of step 2 by (artist) popularity in descending order.
4- Take the N artist from top, where N = total (8) - current.

##Combo suggestions algorithm
1- Take the selected artist.
2- Get top tracks (for US market by now).
3- Order tracks from step 2 by popularity in descending order, avoiding duplicated in the whole list, excluding the ones removed by user.
4- Take the 1st (for replacing) or the 1st and 2nd (for first time combo suggestion).

##Naming suggestion algorithm
1- Get the names of tracks in list.
2- Split by space (" ") to obtain individual words.
3- Replace some characters as (), [], {}.
4- Normalize the words to lowercase an append them to a dictionary (using a Set to avoid duplicated).
5- Build a phrase of variable length from 2 to 5 words, by randomly pick elements from the dictionary, extracting them from it to prevet duplicated selections.

### Development

```
npm install
npm start
Open http://localhost:5000
```