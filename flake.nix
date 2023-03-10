# {
#   inputs.dream2nix.url = "github:nix-community/dream2nix";
#   outputs = inp:
#     inp.dream2nix.lib.makeFlakeOutputs {
#       systemsFromFile = ./nix_systems;
#       config.projectRoot = ./.;
#       source = ./.;
#       projects = ./projects.toml;
#     };
# }
{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.napalm.url = "github:nix-community/napalm";

  # NOTE: This is optional, but is how to configure napalm's env
  inputs.napalm.inputs.nixpkgs.follows = "nixpkgs";

  outputs = {
    self,
    nixpkgs,
    napalm,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages."${system}";
  in {
    packages."${system}".website = napalm.legacyPackages."${system}".buildPackage ./. {};

    devShells."${system}".default = pkgs.mkShell {
      nativeBuildInputs = with pkgs; [nodejs alejandra nodePackages.pnpm];
    };
  };
}
