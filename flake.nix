{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {
      devShells.default = pkgs.mkShell rec {
        LD_LIBRARY_PATH = "${pkgs.stdenv.cc.cc.lib}/lib";
        nativeBuildInputs = with pkgs; [
          nil
          nodejs
          alejandra
          (nodePackages.svelte-language-server.overrideAttrs (old: let
            runtimeLibs = lib.makeLibraryPath [
              stdenv.cc.cc.lib
            ];
          in {
              nativeBuildInputs = [
                autoPatchelfHook
                makeWrapper
              ];
              buildInptus = runtimeLibs;
              preFixup = ''
                wrapProgram "$out/bin/svelteserver" --prefix LD_LIBRARY_PATH : ${runtimeLibs}
              '';
            }
          ))
          nodePackages.typescript-language-server marksman pkgs.stdenv.cc.cc.lib];
      };
    });
}
