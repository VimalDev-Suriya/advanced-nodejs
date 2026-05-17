# Paginated API:

## Generator function vs Normal for loop with API call

- Faster - There is no difference is fast - Both takes the same time to get the total data
- Memory - Memory is the key factor.
  - For every API call the generator function will yeild only the data of the correspdoning page
  - But for the normal for loop we will be maintaining the entire array in memory
- Control
  - We have greater control to handle the data using generator function - we can break, the GC will handle the rest of cleaning up.
  - Manual cleaing of data is required
- Chain
  - I can chain multiple generator function to resolve the data effectively, so business logic will be handled the data effectively
