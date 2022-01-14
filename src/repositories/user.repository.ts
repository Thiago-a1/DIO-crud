import DatabaseError from "../models/errors/database.error.model";
import { User } from "../models/user.model";
import db from "../services/db";

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `
      SELECT uuid, username 
      FROM application_user
    `;

    const { rows } = await db.query<User>(query);
    return rows || [];
  }

  async findById(uuid: string): Promise<User> {
    try {
      const query = `
        SELECT uuid, username 
        FROM application_user
        WHERE uuid = $1
      `;
  
      const values = [uuid];
      const { rows } = await db.query<User>(query, values);
  
      return rows[0];
    } catch (error) {
      console.log(error);
      throw new DatabaseError('Erro na consulta por ID', error);
    }
  }

  async create(user: User): Promise<string> {
    const query = `
      INSERT INTO application_user (
        username,
        password
      )
      values ($1, crypt($2, 'my_salt'))
      RETURNING uuid
    `;

    const values = [user.username, user.password];

    const { rows } = await db.query<{ uuid: string }>(query, values);

    return rows[0].uuid;
  }

  async update(user: User): Promise<User> {
    const query = `
      UPDATE application_user
      SET
        username = $1,
        password = crypt($2, 'my_salt')
      WHERE uuid = $3
      RETURNING uuid, username
    `;

    const values = [user.username, user.password, user.uuid];

    const { rows } = await db.query<User>(query, values);

    return rows[0];
  }

  async remove(uuid: string): Promise<void>{
    const query = `
      DELETE
      FROM application_user
      WHERE uuid = $1
    `;

    const values = [uuid];
    await db.query(query, values);
  }
}

export default new UserRepository();