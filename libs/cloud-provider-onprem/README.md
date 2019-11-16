# On premise cloud provider for the Visual Knight community edition

The on premise cloud priovider gives you the possibility to manage everything on your own server where the api instance is running.

## Configuration

Import the Module into the AppModule. You can configure the folder where the images are archived.

```typescript
@Module({
  imports: [
    //...
    CloudProviderOnpremModule
  ]
})
export class AppModule {}
```

The default folder for the screenshots is in the process directory under `screenshotUploads`.
You can change this if you call the import with the register function.

```typescript
@Module({
  imports: [
    //...
    CloudProviderOnpremModule.register({ dest: './saveMyScreenshotsSomewhereElse' })
  ]
})
export class AppModule {}
```

Choose the on premise cloud provider if you want to host it for yourself.
You could even use the Visual Knights api server inside your testing repository with an SQLite database for continues integration inside a repository. But we don't recommend this because your repository will grow with every screenshot.
