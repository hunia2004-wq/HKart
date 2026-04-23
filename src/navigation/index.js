{isSignedIn ?(
    <Stack.screen name="Home" component={Homescreen}/>
    ) : (
    <Stack.screen name="SignIn" component={SignInScreen}/>
     
)}