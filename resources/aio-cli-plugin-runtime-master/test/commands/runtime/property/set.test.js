/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const TheCommand = require('../../../../src/commands/runtime/property/set.js')
const RuntimeBaseCommand = require('../../../../src/RuntimeBaseCommand.js')
const { PropertyFlagsSet } = require('../../../../src/properties')

test('exports', async () => {
  expect(typeof TheCommand).toEqual('function')
  expect(TheCommand.prototype instanceof RuntimeBaseCommand).toBeTruthy()
})

test('description', async () => {
  expect(TheCommand.description).toBeDefined()
})

test('aliases', async () => {
  expect(TheCommand.aliases).toEqual([])
})

test('args', async () => {
  expect(TheCommand.args).not.toBeDefined()
})

test('base flags included in command flags',
  createTestFlagsFunction(TheCommand, {
    ...PropertyFlagsSet,
    ...RuntimeBaseCommand.baseFlags
  })
)

test('flags', async () => {
  const flags = TheCommand.flags
  expect(TheCommand.flags).toBeDefined()

  expect(flags.namespace).toBeDefined()
  expect(flags.namespace.type).toEqual('option')
})

describe('instance methods', () => {
  let command

  beforeEach(() => {
    command = new TheCommand([])
  })

  describe('run', () => {
    test('exists', async () => {
      expect(command.run).toBeInstanceOf(Function)
    })
  })

  test('--auth', (done) => {
    // set flag
    command.argv = [ '--auth', 'some-auth-key' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('--apihost', (done) => {
    // set flag
    command.argv = [ '--apihost', 'http://myserver' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('--apiversion', (done) => {
    // set flag
    command.argv = [ '--apiversion', 'v2' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('--namespace', (done) => {
    // set flag
    command.argv = [ '--namespace', 'my-namespace' ]
    return command.run()
      .then(() => {
        done()
      })
  })

  test('unknown flag', (done) => {
    command.argv = [ '--unknown-flag', 'some-value' ]
    return command.run()
      .then(() => done.fail('this should not succeed'))
      .catch((err) => {
        expect(err).toMatchObject(new Error('Unexpected arguments: --unknown-flag, some-value\nSee more help with --help'))
        done()
      })
  })
})
