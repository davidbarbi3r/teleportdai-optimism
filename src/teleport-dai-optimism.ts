import { BigInt } from "@graphprotocol/graph-ts";
import {
  teleportDaiOptimism,
  Closed,
  Deny,
  File,
  Flushed,
  Rely,
  TeleportInitialized,
} from "../generated/teleportDaiOptimism/teleportDaiOptimism";
import { User, Teleport, All } from "../generated/schema";

export function handleClosed(event: Closed): void {
  // // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex())
  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex())
  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0)
  // }
  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)
  // // Entity fields can be set based on event parameters
  // // Entities can be written to the store with `.save()`
  // entity.save()
  // // Note: If a handler doesn't require existing field values, it is faster
  // // _not_ to load the entity from the store. Instead, create it fresh with
  // // `new Entity(...)`, set the fields that should be updated and save the
  // // entity back to the store. Fields that were not set or unset remain
  // // unchanged, allowing for partial updates to be applied.
  // // It is also possible to access smart contracts from mappings. For
  // // example, the contract that has emitted the event can be connected to
  // // with:
  // //
  // // let contract = Contract.bind(event.address)
  // //
  // // The following functions can then be called on this contract to access
  // // state variables and other data:
  // //
  // // - contract.batchedDaiToFlush(...)
  // // - contract.domain(...)
  // // - contract.isOpen(...)
  // // - contract.l1TeleportGateway(...)
  // // - contract.l2Token(...)
  // // - contract.messenger(...)
  // // - contract.validDomains(...)
  // // - contract.wards(...)
}

export function handleDeny(event: Deny): void {}

export function handleFile(event: File): void {}

export function handleFlushed(event: Flushed): void {
  
}

export function handleRely(event: Rely): void {}

export function handleTeleportInitialized(event: TeleportInitialized): void {
  let id = event.transaction.hash.toHex();
  let userId = event.transaction.from.toHex()
  let teleport = new Teleport(id);
  let to = event.transaction.to
  let amount = event.params.teleport.amount

  let user = User.load(id)

  if (user == null){
    user = new User(id)
    user.id = userId
    user.amountBridged = BigInt.fromI32(0)
    user.countBridged = BigInt.fromI32(0)
    user.makerFees = BigInt.fromI32(0)
    user.relayFees = BigInt.fromI32(0)
  }

  teleport.id = id
  teleport.amount = amount
  teleport.date = event.block.timestamp
  teleport.originAddress = event.transaction.from
  teleport.destChain = event.params.teleport.targetDomain
  teleport.originChain = event.params.teleport.sourceDomain
  teleport.user = user.id
  
  if (to) {
    teleport.destinationAddress = to
    teleport.save()
  }

  teleport.save()

  //all entity setup
  let all = All.load("all");
  if (all == null) {
    all = new All("all");
    all.id = event.block.timestamp.toHex()
    all.makerFees = BigInt.fromI32(0);
    all.relayFees = BigInt.fromI32(0);
    all.countBridged = BigInt.fromI32(0);
  }

  if (event.receipt){
    user.amountBridged = user.amountBridged.plus(amount)
    user.countBridged = user.countBridged.plus(BigInt.fromI32(1))
    all.countBridged = all.countBridged.plus(BigInt.fromI32(1))
    all.amountBridged = all.amountBridged.plus(amount)
    all.save()
  }
  all.save()
}
