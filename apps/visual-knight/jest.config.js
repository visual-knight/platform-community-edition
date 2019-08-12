module.exports = {
  name: 'visual-knight',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/visual-knight',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
