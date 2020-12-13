# Term Project README

## Application Overview
This application is a simple material list generator.

It allows a user to define a parts table, and from that parts table they can build up assemblies.

Once their assemblies are defined, they specify how many of each assemblies they want for an order, and the program generates
the final parts list with all totals.

It is easier for a user to specify how many assemblies they want, and then let the program calculate how many individual parts are required. 

Perhaps a user (such as a restaurant owner) wants to define a unique assembly (e.g. a menu dish). The "parts" would be the individual components that go into the dish, and the "assembly" definition would be how many of each part goes into the assembly.

They could define a "chicken dinner" assembly with the following parts: chicken breast: 1, green beans: 10, potatoe: 1, etc.

Then when they specify 40 chicken dinners in their order, the program will calculate that they need 40 chicken breasts, 400 green beans, and 40 potatoes. 

When the assemblies are more complicated and the math is harder, a tool like this would be very useful.

This tool is also applicable to many other types of material ordering projects, such as ordering parts for a sprinkler system, building a house, etc.

**So then, this application has Four Primary Tables**
1. Parts Table (list of all parts available with which to build up assemblies)
2. Assemblies Table (comprised of assemblies that are a collection of parts, with various quantities for each part assigned within the assembly)
3. Orders Table (comprised of assemblies, specifying how many of each assembly is desired for the order)
4. Bill of Material Output (the final list of parts and quantities calculated from the assemblies in the Orders Table)

The user will login with authentication, and be presented with the four blank tables listed above. I do not intend to store information from user-session to user-session, as that will be more difficult to implement in the alloted time for this course.

So the user will be presented with four blank tables every time they log in. A real app would allow them to save their work as projects, and be able to edit them at a later time. But this prototype will not implement that feature.

The program flow will go like so:

1. The user will populate the **Parts Table** (via button clicks and typing) with all the unique parts needed for the project. For the restaurant analogy, this would be the individual ingredients in the dishes they want to define.

2. The user will then populate the **Assemblies Table** (via button clicks and typing) with all of the assemblies they want to define, which are comprised of parts and quantities for those parts. For the restaurant analogy, the individual dishes would be the assemblies, and would be defined by how much of each type of ingredient ('part') goes into the dish ('assembly').

3. The user will then populate the **Orders Table** by specifying how many of each assembly they want in their final parts list. For the restaurant analogy, this is where the restaurant would input "40 chicken dinner assemblies" etc.

4. The user will then click the 'Calculate Parts List for Order' button, and the program will automatically populate the **Bill of Material Output Table** with the total number of individual parts needed to make the assemblies specified by the user in the **Orders Table**. 

Each of these tables will be equipped with the standard CRUD operations that the user would expect. Likewise, data integrity will be enforced between the tables. For example, if the user edits the name of a part in the **Parts Table** that is being referenced by one or more assemblies in the **Assemblies Table**, the part description will be automatically updated in the **Assemblies Table** as well to reflect the change.

## Instructions for Running Application
1. Copy or clone repository to local folder. 
2. Navigate to repository local folder
3. Install required node_modules in frontend and backend
4. Note, this depends on the user having a database named 'materialdb' in their MySQL database

## Current State of Application Development
I was not able to complete the app as I had planned, and so only the **Parts Table** and **Assemblies Table** are implemented. All of the CRUD functionality for those pieces are fully vetted and tested in the frontend and backend. 

Also, all of the user authentication flows for all 8 weeks have been incorporated and are fully functional.
