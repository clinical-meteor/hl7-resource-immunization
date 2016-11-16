describe('clinical:hl7-resources-immunizations', function () {
  var server = meteor();
  var client = browser(server);

  it('Immunizations should exist on the client', function () {
    return client.execute(function () {
      expect(Immunizations).to.exist;
    });
  });

  it('Immunizations should exist on the server', function () {
    return server.execute(function () {
      expect(Immunizations).to.exist;
    });
  });

});
