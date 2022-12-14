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

export function handleFlushed(event: Flushed): void {}

export function handleRely(event: Rely): void {}

export function handleTeleportInitialized(event: TeleportInitialized): void {
  let id = event.transaction.hash.toHex();
  let teleport = Teleport.load(id);
  let from = event.transaction.from.toHex();
  let amount = event.transaction.value;

  //all entity setup
  let all = All.load("all");
  if (all == null) {
    all = new All("all");
    all.makerFees = BigInt.fromI32(0);
    all.relayFees = BigInt.fromI32(0);
    all.countBridged = BigInt.fromI32(0);
  }

  if (event.receipt){

    all.countBridged = all.countBridged.plus(BigInt.fromI32(1))
    all.amountBridged = all.amountBridged.plus(amount)
    all.save
  }
}
