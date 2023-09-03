db = db.getSiblingDB("jotajotijp-dev");
//db.auth("testuser", "testpass");

db.createUser({
      user: "hoge",
      pwd: "huga",
      roles: [
        {
          role: "dbOwner",
          db: "jotajotijp-dev"
        },
      ],
});

//db = db.getSiblingDB("jotajotijp-dev");
db.createCollection("sample-data");
