export interface Voter {
  address: string;
  name: string;
  ipfsHash: string;
  isAllowedToVote: boolean;
  hasVoted: boolean;
  vote: number;
}
