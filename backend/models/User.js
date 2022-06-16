const userSchema = mongoose.Schema({
    id: Number, // INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    avatar: { type: String, required: true },
    position: { type: String },
    isAdmin: { type: Boolean },
});

post = {
    id: Number, //INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY
    content: String, //TEXT
    title: String, //TEXT ???
    userId: Number, //INTEGER NOT NULL
    img: String,
    creationDate: Date, // DATETIME
}

comment = {
    id: Number,//INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY
    content: String,
    creationDate: Date, // DATETIME
    userId: Number,//INTEGER NOT NULL
    postId: Number//INTEGER NOT NULL
}

like = {
    postId: Number,
    userId: Number,
}
