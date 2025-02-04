const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Contact',
  tableName: 'contacts',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    company: {
      type: 'varchar',
      nullable: true,
    },
    profile_image: {
      type: 'varchar',
      nullable: true,
    },
    email: {
      type: 'varchar',
      unique: true,
    },
    birthdate: {
      type: 'date',
      nullable: true,
    },
    phone: {
      type: 'varchar',
      nullable: true,
    },
    address: {
      type: 'text',
      nullable: true,
    },
    city: {
      type: 'varchar',
      nullable: true,
    },
    state: {
      type: 'varchar',
      nullable: true,
    },
  },
});