# Photo buying and selling site

{"message":"Signed In Successfully!","ok so we are making image sellign platform
we lerned how to make seller side of things how to sign in how to do authrization and authentication
also we have writen in copy also

now buyer will signup then signin then get all images then Buy and invoice will be generated for this we will do stripe integration
so we will get alert on discord.

1 signup sign in 
2- payment 
-card details - body
-Product id- url
- Buyer details - req.user
3 2 middlewares
- is Authenticated
- is Buyer
4- when success
- Discord
-order details
5- order Model
-Product---with product id we will connect it to user table
-User-- with user id we will connect it to user table with foreing key
-Id

Foreign key - Denotes the some row to some other table
through which we can excess the data
lets get coding

key install the stripe then we take the cvc and other detiaols 
of the user then we verify it 
now we have something called webhooks where we have hooks for all the websites like whatsapp and discodrd where we can send the message directly
we will use discord here we will simply go to id then profile then orfer the webhook then copy the url 
