module.exports = {
  name: 'visual-knight-webapp',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/visual-knight-webapp/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
