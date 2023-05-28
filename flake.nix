{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.napalm.url = "github:nix-community/napalm";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  inputs.napalm.inputs.nixpkgs.follows = "nixpkgs";

  outputs = {
    self,
    nixpkgs,
    napalm,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      packages = rec {
        website = napalm.legacyPackages."${system}".buildPackage ./. {};
        default = website;
      };
      apps = rec {
        website = flake-utils.lib.mkApp {drv = self.packages.${system}.website;};
        default = website;
      };

      devShells.default = pkgs.mkShell {
        nativeBuildInputs = with pkgs; [nil nodejs alejandra nodePackages.svelte-language-server nodePackages.typescript-language-server];
      };
    });
}
