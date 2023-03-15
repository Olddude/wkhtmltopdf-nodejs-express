import { PostRepository } from './post.entity';

async function createPostService() {
  return {
    async getPostsByAuthor(author: string) {
      const postEntities = await PostRepository.find({ author }).exec();
      return postEntities;
    }
  };
}

export { createPostService };
