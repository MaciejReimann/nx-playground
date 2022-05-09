// 0. tests should be as simple and easy as possible - design them for Rich-mode thinking

// 1. The test anatpmy 
    // 1.1 Naming - include 3 parts: what's being tested, what are the conditions, what's expected
describe('Products Service', function() {
    describe('Add new product', function() {
      //2. scenario and 3. expectation
      it('When no price is specified, then the product status is pending approval', ()=> {
        const newProduct = new ProductService().add({});
        expect(newProduct.status).to.equal('pendingApproval');
      });
    });
  });

// 1.2 Structure - AAA Patern: 
    // - Arrange: all the setup necessary to simulate environment (imports, mocks, instantiation) 
    // - Act: execute the tested code (usu. 1 liner)
    // - Assert: check if result matches the expectations (usu. 1 liner)

describe("Customer classifier", () => {
    test("When customer spent more than 500$, should be classified as premium", () => {
      //Arrange
      const customerToClassify = { spent: 505, joined: new Date(), id: 1 };
      const DBStub = sinon.stub(dataAccess, "getCustomer").reply({ id: 1, classification: "regular" });
        
      //Act
      const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);
  
      //Assert
      expect(receivedClassification).toMatch("premium");
    });
  });

// 1.3 Style - Declarative (and BDD centered, uses product language like user stories)
test("When asking for an admin, ensure only ordered admins in results", () => {
    //assuming we've added here two admins
    const allAdmins = getUsers({ adminOnly: true });
  
    expect(allAdmins)
      .to.include.ordered.members(["admin1", "admin2"])
      .but.not.include.ordered.members(["user1"]);
  });

  // 1.4 Implementation - test only public methods (Black box testing)

  // 1.5 Implementation - favour stubs and spies over mocks (?) [spy on error logger, for instance]
    // Ask yourself a question: Could this behaviour appear in a specificaion document?
  it("When a valid product is about to be deleted, ensure an email is sent", async () => {
    //Assume we already added here a product
    const spy = sinon.spy(Emailer.prototype, "sendEmail");
    new ProductService().deletePrice(theProductWeJustAdded);
    //hmmm OK: we deal with internals? Yes, but as a side effect of testing the requirements (sending an email)
    expect(spy.calledOnce).to.be.true;
  });

  // 1.6 Test data - use realistic test data (don't foo)

  // 1.7 Tactics - Property-based testing (use many input combinations)
    // https://github.com/dubzzz/fast-check#readme

  // 1.8 Techniques - avoid snapshots unless short and focused and part of the test file (inline)
  it("When visiting TestJavaScript.com home page, a menu is displayed", () => {
    //Arrange
  
    //Act
    const receivedPage = renderer
      .create(<DisplayPage page="http://www.testjavascript.com"> Test JavaScript </DisplayPage>)
      .toJSON();
  
    //Assert
  
    const menu = receivedPage.content.menu;
    expect(menu).toMatchInlineSnapshot(`
            <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            </ul>
        `);
    });

    // 1.9 Test data - when the test data is shared, avoid 'the mystery guest' antipattern: 
        // Something unseen affected our test results, we don't know what exactly
        // 
    test("When no credit, then the transfer is declined ", async() => {
        // Arrange
        const transferRequest = testHelpers.factorMoneyTransfer({userCredit:100, transferAmount:200}) //obviously there is lack of credit
        const transferServiceUnderTest = new TransferService({disallowOvercharge:true});
    
        // Act
        const transferResponse = await transferServiceUnderTest.transfer(transferRequest);
    
        // Assert
        expect(transferResponse.status).toBe(409); // Obviously if the user has no credit it should fail
        });

    // 1.10 Implementation - Don't catch errors, expect them
        test("When no product name, it throws error 400", async () => {
            await expect(addNewProduct({}))
            .to.eventually.throw(AppError)
            .with.property("code", "InvalidInput");
        });

    // 1.11 Strategy - Use tags (to differentiate tests b/w long-runing - on merge and fast - on commit)
        // this test is fast (no DB) and we're tagging it correspondigly
        // now the user/CI can run it frequently
        describe("Order service", function() {
            describe("Add new order #cold-test #sanity", function() {
            test("Scenario - no currency was supplied. Expectation - Use the default currency #sanity", function() {
                //code logic here
            });
            });
        });
 

    // 1.12 Structure - Use nested describes (to improve readability of test results)
        // 1st is for the name of the unit under test and the 
        // 2nd for additional level of categorization like the scenario or custom categories (or methods?)
        describe("Transfer service", () => {
            //Scenario
            describe("When no credit", () => {
              //Expectation
              test("Then the response status should decline", () => {});
          
              //Expectation
              test("Then it should send email to admin", () => {});
            });
          });
          
// 3. Frontend testing 