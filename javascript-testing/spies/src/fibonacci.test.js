import { Fibonacci } from "./fibonacci.js";
import sinon from "sinon"
import assert from "node:assert"

(async () => {
  {
    const service = new Fibonacci()
    const spy = sinon.spy(service, service.execute.name)

    //generators retornam interators, então é necessario usar o .next para proceguir o processamento
    for await (const _ of service.execute(3)) {}

    const exprectedCallCount = 4;

    assert.deepStrictEqual(exprectedCallCount, spy.callCount)
  }

  {
    const service = new Fibonacci()
    const spy = sinon.spy(service, service.execute.name)

    const [...results] = await service.execute(5)
    const { args } = spy.getCall(2)
    const expectedResult = [ 0, 1, 1, 2, 3 ]

    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    })

    assert.deepStrictEqual(args, expectedParams)
    assert.deepStrictEqual(results, expectedResult)
  }
})();