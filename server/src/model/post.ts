import { Model, Document, model, Schema } from 'mongoose'

interface PostType extends Document {
    id: string
    uid: Schema.Types.ObjectId
    body: string
    post_type: string
    file_url: string
    likes: string[]
    comments: [{
        uid: Schema.Types.ObjectId
        body: string
    }]
    product?: null | Schema.Types.ObjectId
}

interface PostModel extends Model<PostType> { }

const PostSchema = new Schema<PostType, PostModel, PostType>(
    {
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
        body: {
            type: String,
        },
        post_type: {
            type: String,
            default: 'image',
        },
        file_url: {
            type: String
        },
        likes: [{
            type: String,
        }],
        comments: [
            {
                uid: { type: Schema.Types.ObjectId },
                body: { type: String }
            }
        ]
    },
    { timestamps: true }
)

PostSchema.methods.toJSON = function () {
    const data = this
    const post = data.toObject()

    post.id = post._id
    delete post._id
    delete post.__v

    return post
}


const Post = model<PostType, PostModel>('posts', PostSchema)
export default Post