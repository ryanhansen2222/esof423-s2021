const pwvld = require('./resources/presenters/PaginationPresenter')

test("testToBeNull", ()=>{
	beforeEach(() =>  {
    		jest.resetModules();
	});

	expect(pwvld.append('test.com', 'key', '12')).not.toBeNull()
})
