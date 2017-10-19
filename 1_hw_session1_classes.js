const seeFunctionality = () => console.log(`

Functionality:

WORKING DIRECTLY WITH LOCAL STORAGE
===================================

1. setData('databaseName')(data) =>
2. getData('databaseName') => in this case, we have 3 databases: 1) 'usersData', 2) 'entriesData', 3) 'glossariesData'.


FUNCTIONS TO MANIPULATE DATA
============================

APP LEVEL:
---------

1. render('data' || data) => log passed in argmument to the console
2. edit(array)(index)('property')('update') => edit and change any property from any object;
3. destroyAll(array)
4. like(array)('term' || 'title')(index)



USER FUNCTIONALITY:                                            ENTRY FUNCTIONALITY:
....................                                           ...................

1. createUser('name')                                           1. createEntry('author', 'term', 'defOrTrans')*
2. destroyUser(index)                                           2. destroyEntry(index)
3. updateBio(index)('userBio')
4. updateLocation(index)('loc')
5. follow(userA)(userB)*
6. addInterests(userIndex)(...interests)
7. copyInterests(userA)(userB)*
8. addSkills(userIndex)(...skills)
9. copySkills(userA)(userB)*




                              GLOSSARY FUNCTIONALITY:
                              .......................
                              1. createGlossary('author', 'title')*
                              2. destroyGlossary(index)
                              3. describeGlossary(index)('description')
                              4. scopeForGlossary(index)('area')

_______________________________________________________________________________________

Note about arguments =>
text beetwen 'quotes' means that arguments accepts string,
without quotes it accepts varriables,
index means you need to pass in a nubmer.

1* For author, passed in as argument theindex number of authored user from
   users array. defOrTrans === definition or translation of term.
2* UserA and UserB are entered here with the index number they take in the users array.


|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

4. seeFunctionality => it allows you to see the this functionality list again.

`);

seeFunctionality();


// classes

const User = class {
  constructor(name, email, bio, location, interests, followers, skills, following,
                 glossaries, entries, nOfEntries, nOfGlossaries,sharedWithMe) {
    this.name = name;
    this.bio = bio;
    this.location = location;
    this.interests = [];
    this.followers = [];
    this.skills = [];
    this.following = [];
    this.glossaries = [];
    this.entries = [];
    this.nOfEntries = 0;
    this.nOfGlossaries = 0;
    this.sharedWithMe = [];
  }
};

const Glossary = class {
  constructor(title, author, description, area, likes, xShared, status,
                 xCopied, noOfEntries, rating, reviews) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.area = area;
    this.likes = 0;
    this.xShared = 0;
    this.entries = [];
    this.nOfEntries = 0;
    this.rating = rating;
    this.reviews = [];
  }
};


const Entry = class {
  constructor(term, author, defOrTrans, categories, glossary, likes, xShared, xCopied,
                 status, relatedEntries, relatedTerms, mnemotechnics) {
    this.term = term;
    this.author = author;
    this.defOrTrans = defOrTrans;
    this.glossary = glossary;
    this.categories = [];
    this.likes = 0
    this.xShared = 0;
    this.relatedEntries = [];
    this.relatedTerms = [];
    this.mnemotechnics = [];
  }
};

// storing

// const store = (namespace, data) => arguments.length > 1 ? localStorage.setItem(namespace, JSON.stringify(data))
//                                                         : localStorage.getItem(namespace) && JSON.parse(store) || [];

// store

const appStore = { users: [], entries: [], glossaries: [] };
let users = appStore.users;
let entries = appStore.entries;
let glossaries = appStore.glossaries;

// APP FUNCTIONALITY

const render = (data) => console.log(data);


const edit = arr => index => property => update => {
  if (arr !== (users || entries || glossaries)) console.log(
    'Please run the function again passing in the right argument.');
  arr[index][property] = update;
  render(property + ': ' + arr[index][property]);
};

const destroyAll = arr => arr = [];

const like = arr => identifier => index => (
  arr[index].likes++, render('"'+ arr[index][identifier] + '"' + ' has ' + arr[index].likes + ' likes.')
);


const share = userA => arr => itemIndex => userB => {
  users[userB].sharedWithMe = users[userB].sharedWithMe.concat(users[userA][arr][itemIndex]);
  let info = '', glossaryOrEntry = '';
  if (arr === 'glossaries') glossaries[itemIndex].xShared++, glossaryOrEntry = glossaries;
  if (arr === 'entries') entries[itemIndex].xShared++, glossaryOrEntry = entries;
  if (arr === 'glossaries') info = 'glossary'; if (arr === 'entries') info = 'entry';
  render('The following ' +  info + ' has been shared with ' + users[userB].name + ':');
  render(users[userB].sharedWithMe);
  render('This ' + info + ' has been ' + glossaryOrEntry[itemIndex].xShared + ' times shared.');
};



// User

const createUser = name => (users = users.concat(new User(name)), render(users[users.length-1]), render(users));

const destroyUser = index =>
render(users = users.filter(obj => obj !== users[index]));

const updateBio = index => userBio => (users[index].bio = userBio, render('User\'s Bio: ' + userBio));


const updateLocation = user => userLocation => (users[user].location = userLocation,
  render('User\'s Location: ' + userLocation));

const follow = userA => userB => {
  users[userA].following = users[userA].following.concat(users[userB]);
  users[userB].followers = users[userB].followers.concat(users[userA]);
  render(users[userA].name + ' is now following ' + users[userB].name + '.\n'
         + users[userA].name + ' is a follower of ' + users[userB].name) + '.';
};

const addInterests = userIndex => (...interests) => (
  users[userIndex].interests = users[userIndex].interests.concat(interests.join(' ')),
  render(users[userIndex].name + '\'s interests: ' + users[userIndex].interests.join(', ')));

const copyInterests = userA => userB => (
  users[userA].interests = users[userA].interests.concat(users[userB].interests),
  render(users[userA].name + '\'s interests: ' + users[userA].interests.join(', ')));

const addSkills = userIndex => (...skills) => (
  users[userIndex].skills = users[userIndex].skills.concat(skills.join(' ')),
  render(users[userIndex].name + '\'s skills: ' + users[userIndex].skills.join(', ')));

const copySkills = userA => userB => (
  users[userA].skills = users[userA].skills.concat(users[userB].skills.join(' ')),
  render(users[userA].name + '\'s skills: ' + users[userA].skills.join(', ')));


// Glossary

const createGlossary = title => author => {
  if (users[author] === undefined) return render('Undefined User Error: before creating a glossary, you must create a user.');
  glossaries = glossaries.concat(new Glossary(title, users[author]));
  users[author].glossaries = users[author].glossaries.concat(glossaries[glossaries.length-1]);
  render('new glossary : ' + '"' + title + '"' + '.');
  users[author].nOfGlossaries++;
  render('"' + title + '"' + ' was added to ' + users[author].name + '\'s glossaries.');
  render(users[author].name + ' has now ' + users[author].nOfGlossaries + ' glossaries.');
};

const destroyGlossary = index =>
  render(glossaries = glossaries.filter(obj => obj !== glossaries[index]));

const describeGlossary = index => description => (glossaries[index].description = description,
  render(glossaries[index]['title'].toUpperCase() + '\'s description or purpose: \n' + description)
);

const scopeForGlossary = index => area => (glossaries[index].area = area,
  render(glossaries[index]['title'].toUpperCase() + '\'s field or knowledge scope: \n' + area)
);

// Entry

const createEntry = term => author => defOrTrans => glossary => {
  if ((users[author] || glossaries[glossary]) === undefined)
    return render('Undefined Type Error: Have you already created at least one user and one glossary?');
  entries = entries.concat(new Entry(term, users[author], defOrTrans, glossaries[glossary]));
  users[author].entries = users[author].entries.concat(entries[entries.length-1]);
  render('new entry : ' + '"' + term + '"' + '.');
  users[author].nOfEntries++;
  render('"' + term + '"' + ' was added to ' + users[author].name + '\'s entries.');
  render(users[author].name + ' has now ' + users[author].nOfEntries + ' entries.');
  glossaries[glossary].entries = glossaries[glossary].entries.concat(entries[entries.length-1]);
  glossaries[glossary].nOfEntries++;
  render('"' + glossaries[glossary].title + '"' + ' glossary has now ' + glossaries[glossary].nOfEntries + ' entries.');
};

const destroyEntry = index =>
render(entries = entries.filter(obj => obj !== entries[index]));

const addCategories = entryIndex => (...categories) => (
  entries[entryIndex].categories = entries[entryIndex].categories.concat(categories.join(' ')),
  render(entries[entryIndex].term + '\'s categories: ' + entries[entryIndex].categories.join(', ')));


// createUser('Pedro');
// createUser('Marcus');
// createGlossary('dogs glossary')(1);
// createEntry('der Hund')(0)('el perro')(0);
// // shareAll(arr)

// console.log(users[1].glossaries[0]);


// share(0)('entries')(0)(1);
