{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.napalm.url = "github:nix-community/napalm";
  inputs.flake-utils.url = "github:numtide/flake-utils";
  inputs.treefmt-nix.url = "github:numtide/treefmt-nix";
  inputs.napalm.inputs.nixpkgs.follows = "nixpkgs";

  outputs = {
    self,
    nixpkgs,
    napalm,
    flake-utils,
    treefmt-nix,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
      treefmtEval = treefmt-nix.lib.evalModule pkgs ./treefmt.nix;
    in {
      formatter = treefmtEval.config.build.wrapper;

      packages = rec {
        website = napalm.legacyPackages."${system}".buildPackage ./. {};
        default = website;
      };

      apps = rec {
        website = flake-utils.lib.mkApp {drv = self.packages.${system}.website;};
        default = website;
      };

      checks = {
        formatting = treefmtEval.config.build.check self;
      };

      devShells.default = pkgs.mkShell {
        nativeBuildInputs = with pkgs; [nil nodejs alejandra nodePackages.svelte-language-server nodePackages.typescript-language-server nodePackages.pnpm marksman];
      };
    });
}
