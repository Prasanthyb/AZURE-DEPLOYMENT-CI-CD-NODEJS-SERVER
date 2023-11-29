
const { createCar,createQuote } = require('./controls');


describe('createCar function', () => {



  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`TEST CASE SUNNY DAY SCENARIO~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


it("Sunny day scenario", () => {
  const request = {
      body: {
          model: "civic",
          year: 2020,
      },
  };

  const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  createCar(request, res);

  
  expect(res.send).toHaveBeenCalledWith({ car_value: 6620 });

});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~NUMBERS ONLY IS OK~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`//

it("Numbers only is ok", () => {
  const request = {
      body: {
          model: "911",
          year: 2020,
      },
  };

  const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  createCar(request, res);

  
  expect(res.send).toHaveBeenCalledWith({ car_value: 2020 });

});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~NEGATIVE NUMBER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`//

it("Negative Number", () => {
  const request = {
      body: {
          model: "Task-Force",
          year: -987,
      },
  };

  const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  createCar(request, res);

  
   expect(res.status).toHaveBeenCalledWith(500);
  // expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });

});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`TEST CASE FOR INVALID DATATYPE OF YEAR~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

describe('createCar function', () => {
  test('should return 400 status for invalid year data type', async () => {
    const req = {
      body: {
        model: 'civic',
        year: 'invalidYear', // Invalid year data type
      },
    };

    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await createCar(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input data' });
  });

  
});


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TEST CASE FOR NO INPUTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


test('should return 400 status for invalid input data', async () => {
    const req = {
      body: {
        
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  
    await createCar(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input data' });
  });


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~TEST CASE FOR INVALID MODEL DATATYPE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


it("should return 400 status for invalid model data type", () => {
    const request = {
        body: {
            model: 123, // Invalid data type for model (should be a string)
            year: 2014,
        },
    };

    const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    createCar(request, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid input data" });
  
});

});

//~~~~~~~~~~~~~~~~~~~~~~~TEST CASES FOR createQuote FUNCTION~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`//




describe('createQuote function', () => {

//~~~~~~~~~~~~~~~~~~~~~~~~~~~VALID INPUTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  it("valid inputs", () => {
    const request = {
        body: {
            car_value: 6614,
            risk_rating:5,
        },
    };
  
    const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
  
    createQuote(request, res);
  
    
    expect(res.send).toHaveBeenCalledWith({ monthly_premium:27.5, yearly_premium:330 });
  
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~MISSING CAR VALUE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


  it("missing car value", () => {
    const request = {
        body: {
            car_value: "",
            risk_rating:5,
        },
    };
  
    const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
  
    createQuote(request, res);
  
    
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input. Please provide valid car_value and risk_rating.' });
  
  });

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~INVALID RISK RATING DATATYPE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

it("invalid risk rating datatype", () => {
  const request = {
      body: {
          car_value:6614,
          risk_rating:"hi",
      },
  };

  const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  createQuote(request, res);

  
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input. Please provide valid car_value and risk_rating.' });

});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~INVALID RISK RATING VALUE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


it("invalid risk rating value", () => {
  const request = {
      body: {
          car_value:6614,
          risk_rating:7,
      },
  };

  const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  createQuote(request, res);

  
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input. Please provide valid car_value and risk_rating.' });

});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~INVALID car VALUE~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


it("invalid car value", () => {
  const request = {
      body: {
          car_value:"six",
          risk_rating:5,
      },
  };

  const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  createQuote(request, res);
  
  
    
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input. Please provide valid car_value and risk_rating.' });

});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~RISK_RATING < 1~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//


it("invalid car value", () => {
  const request = {
      body: {
          car_value:6614,
          risk_rating:0,
      },
  };

  const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  createQuote(request, res);
  
  
    
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Invalid input. Please provide valid car_value and risk_rating.' });

});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~MINIMUM VALUES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//



it("valid inputs", () => {
  const request = {
      body: {
          car_value:1,
          risk_rating:1,
      },
  };

  const res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
  };

  createQuote(request, res);

  
  expect(res.send).toHaveBeenCalledWith({monthly_premium:0, yearly_premium:0 });

});


})