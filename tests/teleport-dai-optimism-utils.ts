import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
import {
  Closed,
  Deny,
  File,
  Flushed,
  Rely,
  TeleportInitialized
} from "../generated/teleportDaiOptimism/teleportDaiOptimism"

export function createClosedEvent(): Closed {
  let closedEvent = changetype<Closed>(newMockEvent())

  closedEvent.parameters = new Array()

  return closedEvent
}

export function createDenyEvent(usr: Address): Deny {
  let denyEvent = changetype<Deny>(newMockEvent())

  denyEvent.parameters = new Array()

  denyEvent.parameters.push(
    new ethereum.EventParam("usr", ethereum.Value.fromAddress(usr))
  )

  return denyEvent
}

export function createFileEvent(
  what: Bytes,
  domain: Bytes,
  data: BigInt
): File {
  let fileEvent = changetype<File>(newMockEvent())

  fileEvent.parameters = new Array()

  fileEvent.parameters.push(
    new ethereum.EventParam("what", ethereum.Value.fromFixedBytes(what))
  )
  fileEvent.parameters.push(
    new ethereum.EventParam("domain", ethereum.Value.fromFixedBytes(domain))
  )
  fileEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromUnsignedBigInt(data))
  )

  return fileEvent
}

export function createFlushedEvent(targetDomain: Bytes, dai: BigInt): Flushed {
  let flushedEvent = changetype<Flushed>(newMockEvent())

  flushedEvent.parameters = new Array()

  flushedEvent.parameters.push(
    new ethereum.EventParam(
      "targetDomain",
      ethereum.Value.fromFixedBytes(targetDomain)
    )
  )
  flushedEvent.parameters.push(
    new ethereum.EventParam("dai", ethereum.Value.fromUnsignedBigInt(dai))
  )

  return flushedEvent
}

export function createRelyEvent(usr: Address): Rely {
  let relyEvent = changetype<Rely>(newMockEvent())

  relyEvent.parameters = new Array()

  relyEvent.parameters.push(
    new ethereum.EventParam("usr", ethereum.Value.fromAddress(usr))
  )

  return relyEvent
}

export function createTeleportInitializedEvent(
  teleport: ethereum.Tuple
): TeleportInitialized {
  let teleportInitializedEvent = changetype<TeleportInitialized>(newMockEvent())

  teleportInitializedEvent.parameters = new Array()

  teleportInitializedEvent.parameters.push(
    new ethereum.EventParam("teleport", ethereum.Value.fromTuple(teleport))
  )

  return teleportInitializedEvent
}
